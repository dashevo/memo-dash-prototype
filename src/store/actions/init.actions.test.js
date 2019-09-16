import {
  InitActionTypes,
  initMemoDashClient,
  initFinished
} from "./init.actions"
import {
  verifyAction,
  mockStoreAndDispatch,
  getAction
} from "../../test-utils/actions.test-helper"

import MemoDashLib from "../../lib/memo-dash.lib"
jest.mock("../../lib/memo-dash.lib")

describe("init actions", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    MemoDashLib.mockClear()
  })

  describe("should create an action", () => {
    it("to indicate that initialization has been finished", () => {
      verifyAction(InitActionTypes.INIT_FINISHED, {}, initFinished)
    })
  })

  describe("when dispatching initMemoDashClient action", () => {
    let actions
    beforeEach(async () => {
      actions = await mockStoreAndDispatch({}, initMemoDashClient())
    })

    it("should initialize the MemoDashLib", () => {
      expect(MemoDashLib).toHaveBeenCalledTimes(1)
    })

    it("should dispatch initFinished action", async () => {
      expect(await getAction(actions, InitActionTypes.INIT_FINISHED)).toEqual(
        initFinished(MemoDashLib.mock.instances[0])
      )
    })
  })
})
