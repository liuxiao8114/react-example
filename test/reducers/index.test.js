import * as actions from '../../src/actions'
import rootReducer from '../../src/reducers'
import * as types from '../../src/actions/actionTypes'

const SUBREDDIT_1 = 'SUBREDDIT_1'
const SUBREDDIT_2 = 'SUBREDDIT_2'

const SELECTED_SUBREDDIT_ACTION = {
  type: types.SELECTED_SUBREDDIT,
  subreddit: SUBREDDIT_1
}

const RECEIVE_POSTS_ACTION = {
  type: types.RECEIVE_POSTS,
  subreddit: SUBREDDIT_1,
  posts: []
}

const REQUEST_POSTS_ACTION = {
  type: types.REQUEST_POSTS,
  subreddit: SUBREDDIT_1
}

const INVALIDATE_POSTS_ACTION = {
  type: types.INVALIDATE_POSTS,
  subreddit: SUBREDDIT_2
}

const INITIAL_POST_STATE = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

const INIT_SELECTED_STATE = ''

const INIT_ROOT_STATE = {
  selectedSubreddit: INIT_SELECTED_STATE,
  postsBySubreddit: INITIAL_POST_STATE
}

describe('test selectedSubreddit reducer', () => {
//  const selectedSubreddit = rootReducer.selectedSubreddit

  it('returns subreddit with SELECTED_SUBREDDIT type', () => {
    const newState = rootReducer(INIT_ROOT_STATE, SELECTED_SUBREDDIT_ACTION)
    expect(newState.selectedSubreddit).toEqual(
      SELECTED_SUBREDDIT_ACTION.subreddit)
  })

  it('returns pre-state when not SELECTED_SUBREDDIT type', () => {
    const newState = rootReducer(INIT_ROOT_STATE, {
      type: 'not selected subreddit'
    })
    expect(newState).toEqual(INIT_ROOT_STATE)
  })
})

describe('test postsBySubreddit reducer', () => {

  it('returns pre-state when not posts type', () => {
    const newState = rootReducer(INIT_ROOT_STATE, {
      type: 'not post subreddit'
    })
    expect(newState.postsBySubreddit).toEqual(INITIAL_POST_STATE)
  })

  it('returns invalidate type', () => {
    const postsBySubreddit =
      rootReducer(INIT_ROOT_STATE, INVALIDATE_POSTS_ACTION).postsBySubreddit
    expect(postsBySubreddit[SUBREDDIT_2].isFetching).toBe(false)
    expect(postsBySubreddit[SUBREDDIT_2].didInvalidate).toBe(true)
    expect(postsBySubreddit[SUBREDDIT_2].posts.length).toBe(0)
  })

  it('returns request type', () => {
    const postsBySubreddit =
      rootReducer(INIT_ROOT_STATE, REQUEST_POSTS_ACTION).postsBySubreddit
    expect(postsBySubreddit[SUBREDDIT_1].isFetching).toBe(true)
    expect(postsBySubreddit[SUBREDDIT_1].didInvalidate).toBe(false)
    expect(postsBySubreddit[SUBREDDIT_1].posts.length).toBe(0)
  })

  it('returns receive type', () => {
    const postsBySubreddit =
      rootReducer(INIT_ROOT_STATE, RECEIVE_POSTS_ACTION).postsBySubreddit
    expect(postsBySubreddit[SUBREDDIT_1].isFetching).toBe(false)
    expect(postsBySubreddit[SUBREDDIT_1].didInvalidate).toBe(false)
  })
})


/*

*/
