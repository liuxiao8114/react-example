import * as types from './actionTypes'

export function selectedSubreddit(subreddit) {
  return {
    type: types.SELECTED_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: types.INVALIDATE_POSTS,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: types.REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: types.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit.items[subreddit]
  console.log(`posts: ${posts}, subreddit: ${subreddit}`)
  if(!posts) {
    return true
  } else if(posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

const API = subreddit => `http://www.reddit.com/r/${subreddit}.json`

export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(API(subreddit)).then(
      response => response.json(),
      error => console.log('Error occurred', error) //eslint-disable-line
    ).then(
      json => dispatch(receivePosts(subreddit, json))
    )
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState(), subreddit)) {
      return fetchPosts(subreddit)
    } else {
      return Promise.resolve()
    }
  }
}
