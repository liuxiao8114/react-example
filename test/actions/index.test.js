import configureStore from 'redux-mock-store'
import mockFetch from 'fetch-mock'
import thunk from 'redux-thunk'

import * as actions from '../../src/actions'
import * as types from '../../src/actions/actionTypes'

const SELECT_KEY_1 = 'SELECT_KEY_1'
const SELECT_KEY_2 = 'SELECT_KEY_2'

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

describe('actions', () => {
  it('dispatch a selectedSubreddit', () => {
     const select = actions.selectedSubreddit(SELECT_KEY_1)
     expect(select.type).toBe(types.SELECTED_SUBREDDIT)
     expect(select.subreddit).toBe(SELECT_KEY_1)
  })

  it('receivePosts when async fetchPosts is done', () => {
    mockFetch.getOnce(
      `http://www.reddit.com/r/${SELECT_KEY_1}.json`,
      { body: { items: ['do something'] },
        headers: { 'content-type': 'application/json' }
      }
    )

    const expectedActions = [
      { type: types.REQUEST_POSTS },
      { type: types.RECEIVE_POSTS, body: { items: ['do something'] } }
    ]

    const store = mockStore({})

    return store.dispatch(actions.fetchPosts(SELECT_KEY_1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  /*
    const INITIAL_STATE = { SELECT_KEY_2 }
    jest.mocks('fetch')
    const store = createStore()
    it('', () => {
      store.dispatch(actions.fetchPostsIfNeeded(SELECT_KEY_1))
        .then(() => {
          expect()
        })
    })
  */
})
