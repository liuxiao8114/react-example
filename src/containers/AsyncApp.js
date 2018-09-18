import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Picker from '../components/Picker'
import Posts from '../components/Posts'
import * as actions from '../actions'

class AsyncApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(actions.fetchPostsIfNeeded(selectedSubreddit))
  }

  handleChange(eventOrValue) {
    if(typeof eventOrValue !== 'string')
      eventOrValue = eventOrValue.target.value

    const { dispatch, selectedSubreddit } = this.props
    dispatch(actions.selectedSubreddit(eventOrValue))
    console.log(`prevSelected: ${selectedSubreddit}, currentValue: ${eventOrValue}`)
    if(selectedSubreddit !== eventOrValue)
      dispatch(actions.fetchPostsIfNeeded(eventOrValue))
  }

  handleRefresh() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(actions.fetchPosts(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={ selectedSubreddit } onChange={ this.handleChange } />
        <p>
          { lastUpdated &&
            <span> Last updated at { new Date(lastUpdated).toLocaleTimeString() } </span>
          }
          { !isFetching &&
            <button onClick={() => { this.handleRefresh() }}>Refresh</button>
          }
          { isFetching && posts.length === 0 && <h2>Loading...</h2> }
          { !isFetching && posts.length === 0 && <h2>This is an empty search!</h2> }
          { posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
          }
        </p>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  lastUpdated: PropTypes.string,
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching,
          posts,
          lastUpdated
        } = postsBySubreddit[selectedSubreddit] || {
          isFetching: false,
          posts: []
        }

  return {
    selectedSubreddit,
    isFetching,
    posts,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
