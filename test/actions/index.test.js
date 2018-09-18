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
      `https://api.github.com/search/repositories?q=${SELECT_KEY_1}.json&page=1`,
      { items: ['react', 'react-redux'] ,
        headers: { 'content-type': 'application/json' }
      }
    )

    const expectedActions = [
      { type: types.REQUEST_POSTS, subreddit: SELECT_KEY_1 },
      { type: types.RECEIVE_POSTS, posts: ['react', 'react-redux'], subreddit: SELECT_KEY_1 }
    ]

    const store = mockStore({})

    return store.dispatch(actions.fetchPosts(SELECT_KEY_1)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual(expectedActions[0])
      expect(actions[1].type).toEqual(expectedActions[1].type)
      expect(actions[1].subreddit).toEqual(expectedActions[1].subreddit)
      expect(actions[1].posts).toEqual(expectedActions[1].posts)
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
