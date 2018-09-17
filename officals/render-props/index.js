import React from 'react'

class MouseTracker extends React.Component {
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0
    }
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
      <div onMouseMove={this.handleMove}>

      </div>
    )
  }
}
