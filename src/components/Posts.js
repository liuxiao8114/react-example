import React from 'react'
import PropTypes from 'prop-types'

export default class Posts extends React.Component {
  render() {
    const { posts } = this.props
    if(!posts) throw new Error('posts should not get into Post render when null')

    const lists = posts.map((post, i) => {
      return (<li key={'POSTS_' + i}>{ 'post_content_' + i + ': ' + post }</li>)
    })

    return (
      <ul>
        { lists }
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}
