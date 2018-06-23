import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const verifyAction = (type, payload, actionCreator) => {
  const expectedAction = {
    type,
    payload
  }
  expect(actionCreator(payload)).toEqual(expectedAction)
}

const mockStore = configureMockStore([thunk])

const mockStoreAndDispatch = async (state, actionCreator) => {
  const store = mockStore(state)
  await store.dispatch(actionCreator)
  return store.getActions()
}

const findAction = (actions, type) => actions.find(action => action.type === type)

const getAction = (actions, type) => {
  const action = findAction(actions, type)
  if (action) return Promise.resolve(action)

  return new Promise(resolve => {
    store.subscribe(() => {
      const action = findAction(store, type)
      if (action) resolve(action)
    })
  })
}

export { verifyAction, mockStoreAndDispatch, getAction }
