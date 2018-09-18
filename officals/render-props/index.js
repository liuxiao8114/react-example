import React from 'react'
import PropTypes from 'prop-types'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    )
  }
}

Cat.propTypes = {
  mouse: PropTypes.object
}

class MouseWithCat extends React.Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

class Mouse extends React.Component {
  constructor() {
    super()
    this.state = { x: 0, y: 0 }
    this.handleMove = this.handleMove.bind(this)
  }

  handleMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMove}>
        { this.props.render(this.state) }
        <p>The current mouse position is X: { this.state.x }, Y: { this.state.y }</p>
      </div>
    )
  }
}

Mouse.propTypes = {
  render: PropTypes.func.isRequired
}

export class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Try move the mouse around!</h1>
        <Mouse render={ mouse => (<Cat mouse={mouse}/>) }/>
      </div>
    )
  }
}
