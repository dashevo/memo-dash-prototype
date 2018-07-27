import data from '@dashevo/dash-schema/dash-core-daps/memodash/memodash-client-fixtures'
import dashMemoSchema from '@dashevo/dash-schema/dash-core-daps/memodash/memodash-schema'

import faker from 'faker'

const generateTestData = async client => {
  let availableDap = await client.searchDaps(dashMemoSchema.title)
  if (availableDap.length > 0) {
    console.log('Dap already available -> skip creation', availableDap[0])
    const dapId = availableDap[0].dapcontract.meta.dapid
    await loadDapContract(client, dapId)
  } else {
    console.log('No Dap available -> create one', availableDap[0])
    try {
      const users = [data.alice_subtx_1.subtx.uname, data.bob_subtx_1.subtx.uname]
      await createUsers(client, ...users)
      await connectMutually(client, ...users)
    } catch (e) {
      client.log('error generating test data', e)
      throw new Error(e)
    }
  }
}

const loadDapContract = async (client, dapId) => {
  const dapContract = await client.getDap(dapId)
  client.setDap(dapContract)
}

const createUsers = async (client, ...users) => {
  for (let i in users) {
    const username = users[i]
    // Create blockchain user & login to the Client
    await client.createBlockchainUser(username)
    await client.login(username)

    // First user create's DAP contract and loads it
    if (i === '0') {
      console.log('Create DAP')
      const dapid = await client.createDap(dashMemoSchema)
      await loadDapContract(client, dapid)
    }

    await client.signup({
      text: faker.lorem.sentence(),
      avatarUrl: faker.image.avatar(),
      address: faker.address.streetAddress(),
      name: faker.name.firstName()
    })

    // post memos
    for (let i = 0; i < 3; i++) {
      await client.postMemo(faker.lorem.sentence())
    }

    client.logout()
  }
  client.log('generated test data for ' + dashMemoSchema.title)
}

const connectMutually = async (client, ...users) => {
  for (const user of users) {
    for (const otherUser of users) {
      if (user === otherUser) continue

      await client.login(user)

      //follow
      await client.followUser(otherUser)

      //like first memo
      const memos = await client.getMemosByUsername(otherUser)
      if (memos && memos.length > 0) {
        await client.likeMemo(memos[0].username, memos[0].idx)
      }
      client.logout()
    }
  }
}

export default generateTestData
