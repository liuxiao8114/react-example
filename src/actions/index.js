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
  console.log(`in json: ${json.items}`)
  return {
    type: types.RECEIVE_POSTS,
    subreddit,
    posts: json.items,
    receivedAt: Date.now()
  }
}

function shouldFetchPosts(state, subreddit) {
  const results = state.postsBySubreddit[subreddit]
  if(!results) {
    return true
  } else if(results.isFetching) {
    return false
  } else {
    return results.didInvalidate
  }
}

export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://api.github.com/search/repositories?q=${subreddit}.json&page=1`)
    .then(
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
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}
