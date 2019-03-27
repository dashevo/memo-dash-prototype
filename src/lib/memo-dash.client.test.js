import { MemoDashClient } from './memo-dash.client'

describe('MemoDashClient', () => {
  const DAPI_CLIENT_SEEDS = 'devnet-porto.thephez.com'
  const DAPI_CLIENT_PORT = 3000
  // https://github.com/dashevo/dash-network-configs/blob/master/devnet-porto/devnet-porto.yml#L11
  const FAUCET_PRIVATE_KEY = 'cR4t6evwVZoCp1JsLk4wURK4UmBCZzZotNzn9T1mhBT19SH9JtNt'
  const NETWORK = 'devnet'

  let client = null
  // let bobClient = null

  // Create DPP
  beforeAll(() => {})

  // Prepare clients
  beforeAll(() => {
    const seeds = DAPI_CLIENT_SEEDS.split(',').map(ip => ({
      service: `${ip}:${DAPI_CLIENT_PORT}`
    }))

    client = new MemoDashClient(NETWORK, seeds, FAUCET_PRIVATE_KEY)
    // bobClient = new MemoDashClient(NETWORK, seeds, FAUCET_PRIVATE_KEY)
  })

  // Create Blockchain Users
  beforeAll(() => {
    // Register Alice's Blockchain User
    // aliceClient.
    // aliceClient.DAPI.CreateUser(data.alice_subtx_1);
    // aliceClient.DAPI.DashCore.mineBlock();
    // let bu = aliceClient.DAPI.GetUserByName(data.alice_subtx_1.subtx.uname);
    // let {valid} = Schema.validate.blockchainuser(bu);
    // expect(valid).to.be.true();
  })

  before("Register Alice's DAP in the Platform DAP", async () => {})

  describe('init', () => {
    it('should create the contract', () => {})
  })

  describe('Profile', function() {
    it.only('should be able to signup', async () => {})
    it('should not be able to signup twice', async () => {})
    it('should be able to update profile', async () => {})
    it('should be able to list profiles', async () => {})
  })

  describe.skip('Memo', function() {
    it('should be able to post memo', async () => {})
    it("should be able to read other user's memo", async () => {})
    it('should be able to edit memo', async () => {})
    it('should be able to list all memos', async () => {})
    it('should be able to delete memo', async () => {})
  })

  describe.skip('MemoReply', function() {
    it('should reply to memo', async () => {})
    it('should read replies to memo', async () => {})
    it('should delete reply to memo', async () => {})
  })

  describe.skip('Like', function() {
    it('should like memo', async () => {})
    it('should not be able to like one memo twice', async () => {})
    it('should remove like', async () => {})
    it('should tip memo', async () => {})
  })

  describe.skip('Follow', function() {
    it('should follow another user', async () => {})
    it("shouldn't follow user twice", async () => {})
    it('should list user followers', async () => {})
    it('should list users that you are following', async () => {})
    it('should unfollow another user', async () => {})
  })
})
