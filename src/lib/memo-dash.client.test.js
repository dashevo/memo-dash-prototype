/**
 * @jest-environment node
 */

import { MemoDashLib } from "./memo-dash.lib"
import DAPIClient from "@dashevo/dapi-client"

import DashPlatformProtocol from "@dashevo/dpp"
import {
  Transaction,
  PrivateKey,
  PublicKey,
  Address
} from "@dashevo/dashcore-lib"

const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7)

const wait = ms => new Promise(res => setTimeout(res, ms))

describe("MemoDashLib", () => {
  const MEMO_DASH_USER_PRIVATE_KEY =
    process.env.REACT_APP_MEMO_DASH_USER_PRIVATE_KEY

  const DAPI_CLIENT_SEEDS = process.env.REACT_APP_DAPI_CLIENT_SEEDS
  const DAPI_CLIENT_PORT = process.env.REACT_APP_DAPI_CLIENT_PORT
  // https://github.com/dashevo/dash-network-configs/blob/master/devnet-porto/devnet-porto.yml#L11
  const FAUCET_PRIVATE_KEY = process.env.REACT_APP_FAUCET_PRIVATE_KEY
  const NETWORK = process.env.REACT_APP_NETWORK

  let client = null
  let seeds = null

  let alice = null
  let bob = null
  let charlie = null

  // Create DPP
  beforeAll(() => {
    jest.setTimeout(50000)
  })

  // Prepare memo-dash client
  beforeAll(async () => {
    seeds = DAPI_CLIENT_SEEDS.split(",").map(ip => ({
      service: `${ip}:${DAPI_CLIENT_PORT}`
    }))

    client = new MemoDashLib(
      NETWORK,
      seeds,
      "memo-dash",
      FAUCET_PRIVATE_KEY,
      MEMO_DASH_USER_PRIVATE_KEY
    )

    await client.publishContract()
    await client.dapiClient.generate(1)
  })

  // Create Blockchain Users
  beforeAll(async () => {
    alice = {
      username: randomString(),
      name: "Alice",
      address: "Alices Address"
    }

    bob = {
      username: randomString(),
      name: "Bob",
      address: "Bobs Address"
    }

    charlie = {
      username: randomString(),
      name: "Charlie",
      address: "Charlies Address"
    }
  })

  describe("User", () => {
    // it.only("t", async () => {
    //   await client.signup("dz3xgr", alice.name, alice.address, '9b932e4951a5a3d5d04b38783397e5de04fb1a06407a6255bd489d4ad3f4ff95');
    //
    //   await client.dapiClient.generate(1);
    //   await new Promise(res => setTimeout(res, 1000));
    //
    //   expect(
    //       (await client.dapiClient.getUserByName("dz3xgs")).uname
    //   ).toEqual("dz3xgs");
    // })

    it("should be able to signup user", async () => {
      await client.signup(alice.username, alice.name, alice.address)
      await client.signup(bob.username, bob.name, bob.address)
      await client.signup(charlie.username, charlie.name, charlie.address)

      await client.dapiClient.generate(1)
      await new Promise(res => setTimeout(res, 1000))

      expect(
        (await client.dapiClient.getUserByName(alice.username)).uname
      ).toEqual(alice.username)
      expect(
        (await client.dapiClient.getUserByName(bob.username)).uname
      ).toEqual(bob.username)
      expect(
        (await client.dapiClient.getUserByName(charlie.username)).uname
      ).toEqual(charlie.username)
    })

    it("should not be able to signup twice", async () => {
      await new Promise(res => setTimeout(res, 5000))
      try {
        await client.signup(alice.username, alice.name, alice.address)
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false)
      } catch (e) {
        expect(e.message).toBe(`User ${alice.username} already exists`)
      }
    })
  })

  describe("Contract", () => {
    it.only("should create and publish contract", async () => {
      const contractName = "9l1qg3" //randomString();

      // try {
      //   await client.dapiClient.fetchContract(contractName);
      //   // Fail test if above expression doesn't throw anything.
      //   expect(true).toBe(false);
      // } catch (e) {}

      const newClient = new MemoDashLib(
        NETWORK,
        seeds,
        contractName,
        FAUCET_PRIVATE_KEY,
        MEMO_DASH_USER_PRIVATE_KEY
      )
      //
      // await newClient.publishContract();
      // await client.dapiClient.generate(1);
      // await new Promise(res => setTimeout(res, 5000));

      const contract = await newClient.dapiClient.fetchContract(contractName)
      expect(contract).toBeDefined()
      //await client.signup("alice.username", alice.name, alice.address);
      //const userId = client.dpp.getUserId();
      //client._createContract(userId);
    })
  })

  describe.skip("unsorted", () => {
    it("should be able to login user", async () => {
      await client.login(alice.username)
      expect(client.currentUser).toMatchSnapshot()

      const userId = await client.getUserId(alice.username)
      expect(client.dpp.getUserId()).toBe(userId)
      expect(client.isAuthed).toBeTruthy()
    })

    it("should be able to logout user", async () => {
      await client.logout(alice.username)
      expect(client.currentUser).toBe(undefined)
      expect(client.dpp.getUserId()).toBe(undefined)
      expect(client.isAuthed).toBeFalsy()
    })

    it("should be able to search for users", async () => {
      const users = await client.searchBlockchainUsers(
        alice.username.substring(0, 3)
      )
      expect(users).toMatchSnapshot()
    })

    it("should be able to get multiple users", async () => {
      const users = await client.getUsers([alice.username, bob.username])
      expect(users).toMatchSnapshot()
    })

    it("should be able to get all users", async () => {
      const users = await client.getAllUsers()
      expect(users.totalCount).toBeGreaterThan(2)
    })

    describe("Profile", function() {
      it("should be able to get user profile", async () => {
        const userId = await client.getUserId(alice.username)
        const profile = await client.getUserProfile(userId)

        expect(profile).toMatchSnapshot()
      })
      it.skip("should be able to update profile", async () => {})
      it.skip("should be able to list profiles", async () => {})
    })

    /*

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
    }) */
  })
})
