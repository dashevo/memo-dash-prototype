import data from '@dashevo/dash-schema/daps/memodash/memodash-client-fixtures'
import dashMemoSchema from '@dashevo/dash-schema/daps/memodash/memodash-schema'
import faker from 'faker'
import { MemoDashClient, Schema } from '@dashevo/dash-schema/vmn'

const generateTestData = async client => {
  let dapid = null
  const title = 'MemoDash'

  let o = await client.searchDaps(title)
  console.log('found daps', o)
  if (o.length > 0) {
    return client.getDap(o[0].dapcontract.meta.dapid)
  }

  try {
    await createUsers(client, data.alice_subtx_1.subtx.uname, data.bob_subtx_1.subtx.uname)
    await followMutually(client, data.alice_subtx_1.subtx.uname, data.bob_subtx_1.subtx.uname)
  } catch (e) {
    let m = 'error generating test data'
    client.log(m, e)
    throw new Error(e)
  }
  return client.getDap(dapid)
}

const createUsers = async (client, ...users) => {
  let dapContract = null
  let dapid = null
  const title = 'MemoDash'
  for (let i in users) {
    // testUsers.forEach(async (testUser, i) => {
    // Create blockchain user & login to the Client
    await client.createBlockchainUser(users[i])
    await client.login(users[i])

    // First user create's DAP contract and loads it
    if (i == 0) {
      console.log('Schema.Daps[title]', Schema.Daps[title])
      dapid = await client.createDap(Schema.Daps[title])
      dapContract = await client.getDap(dapid)
      client.setDap(dapContract)
    }

    await client.signup({
      text: faker.lorem.sentence(),
      avatarUrl: faker.image.avatar(),
      address: faker.address.streetAddress(),
      name: faker.name.firstName()
    })

    client.logout()
  }
  client.log('generated test data for ' + title)
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
