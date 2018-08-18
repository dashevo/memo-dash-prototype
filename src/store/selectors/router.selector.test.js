import * as selector from './router.selector'

describe('router selector', () => {
  const state = {
    router: {
      location: { pathname: 'pathname' }
    }
  }

  it('should return pathname', () => {
    expect(selector.getPathname(state)).toEqual('pathname')
  })
})
