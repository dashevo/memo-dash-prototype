import * as selector from './root.selector'

describe('router selector', () => {
  const state = {
    root: {
      memoDashLib: 'memoDashLib'
    }
  }

  it('should return memoDashLib', () => {
    expect(selector.getMemoDashLib(state)).toEqual('memoDashLib')
  })
})
