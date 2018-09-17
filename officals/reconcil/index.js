import React from 'react'
import PropTypes from 'prop-types'

const Todo = props => {
  return (
    <tr>
      <td>{props.id}</td>
      <td><input/></td>
      <td>{props.createdAt.toTimeString()}</td>
    </tr>
  )
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}

class TodoList extends React.Component {
  constructor() {
    super()
    this.state = {
      todoCounter: 1,
      list: [
        { id: 1,
          createAt: new Date()
        }
      ]
    }
  }

  addToStart() {
    const list = this.state.list.concat(),
          nextId = this.state.todoCounter + 1

    list.unshift({ id: nextId, createAt: new Date() })
    this.setState({
      list,
      todoCounter: nextId
    })
  }

  addToEnd() {
    const nextId = this.state.todoCounter + 1
    this.setState({
      list: [
        ...this.state.list,
        { id: nextId, createAt: new Date() }
      ],
      todoCounter: nextId
    })
  }

  sortByEarlist() {
    const list = this.state.list.sort((a, b) => {
      return a.createAt - b.createAt
    })
    this.setState({
      list
    })
  }

  sortByLatest() {
    const list = this.state.list.sort((a, b) => {
      return b.createAt - a.createAt
    })
    this.setState({
      list
    })
  }

  render() {
    return (
      <div>
        <code>key=index</code>
        <button onClick={this.addToStart.bind(this)}>Add New to Start</button>
        <button onClick={this.addToEnd.bind(this)}>Add New to End</button>
        <button onClick={this.sortByEarlist.bind(this)}>Sort by Earlist</button>
        <button onClick={this.sortByLatest.bind(this)}>Sort by Latest</button>
        <table>
          {this.state.list.map((item, index) => {
            <Todo key={index} id={item.id} createAt={item.createAt}/>
          })}
        </table>
      </div>
    )
  }
}

TodoList.propTypes = {

}
