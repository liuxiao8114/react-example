import React from 'react'
import PropTypes from 'prop-types'

export default class Posts extends React.Component {
  render() {
    const { posts } = this.props
    if(!posts) throw new Error('posts should not get into Post render when null')

    const lists = posts.map((post, i) => {
      return (<li key={post.id}>{ `post_content_${i}: name: ${post['full_name']}, description: ${post['description']}` }</li>)
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
