import { combineReducers } from 'redux'
// import * as actions from '../actions'
import * as types from '../actions/actionTypes'

const INITIAL_POST_STATE = {
  isFetching: false,
  didInvalidate: false,
  posts: []
}

const DEFAULT_SUBREDDIT = 'react'

function todos(state = {}, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return {

      }
    default:
      return state
  }
}

function selectedSubreddit(state = DEFAULT_SUBREDDIT, action) {
  switch (action.type) {
    case types.SELECTED_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(state = INITIAL_POST_STATE, action) {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
      })
    case types.INVALIDATE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      })
    default:
      return state
  }
}

function postsBySubreddit(state = INITIAL_POST_STATE, action) {
  switch (action.type) {
    case types.REQUEST_POSTS:
    case types.RECEIVE_POSTS:
    case types.INVALIDATE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
//  todos,
  selectedSubreddit,
  postsBySubreddit
})

export default rootReducer
