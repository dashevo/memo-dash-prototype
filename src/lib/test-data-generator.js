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
      await createUsers(client, data.alice_subtx_1.subtx.uname, data.bob_subtx_1.subtx.uname)
      await followMutually(client, data.alice_subtx_1.subtx.uname, data.bob_subtx_1.subtx.uname)
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
    // Create blockchain user & login to the Client
    await client.createBlockchainUser(users[i])
    await client.login(users[i])

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

    for (let i = 0; i < 3; i++) {
      await client.postMemo(faker.lorem.sentence())
    }

    client.logout()
  }
  client.log('generated test data for ' + dashMemoSchema.title)
}

const followMutually = async (client, ...users) => {
  for (const user of users) {
    const usersToFollow = users.filter(async userToFollow => userToFollow !== user)
    for (const userToFollow of usersToFollow) {
      await client.login(user)
      await client.followUser(userToFollow)
      client.logout()
    }
  }
}

export default generateTestData
