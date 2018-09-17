import React from 'react'
import PropTypes from 'prop-types'

export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props
    if(!todos) return

    const lists = todos.map((todo, i) => {
      return (<li key={'TODO_' + i}>{ todo.text }</li>)
    })
    return (
      <div>
        { lists }
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array
}
