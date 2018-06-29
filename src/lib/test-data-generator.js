import data from '@dashevo/dash-schema/daps/memodash/memodash-client-fixtures'
import dashMemoSchema from '@dashevo/dash-schema/daps/memodash/memodash-schema'
import faker from 'faker'

const generateTestData = async client => {
  await _createUser(data.alice_subtx_1, client, true)
  await _createUser(data.bob_subtx_1, client)
  await _createUser(data.charlie_subtx_1, client)
}

const _createUser = async (user, client, createDAPContract) => {
  client.DAPI.CreateUser(user)
  await client.login(user.subtx.uname)

  if (createDAPContract) {
    const dapid = await client.createDap(dashMemoSchema)
    const dapContract = await client.getDap(dapid)
    client.setDap(dapContract)
  }

  // Signup to the DAP space
  await client.signup({
    text: faker.lorem.sentence(),
    avatarUrl: faker.image.avatar(),
    address: faker.address.streetAddress(),
    name: faker.name.firstName()
  })

  client.logout()
}

export default generateTestData
