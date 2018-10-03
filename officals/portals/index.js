// Event Bubbling Through Portals
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const modal = document.getElementById('modal')

// create children with Parent '#modal'
class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.class = 'modal-container'
  }

  componentDidMount() {
    modal.appendChild(this.el)
  }

  componentWillUnmount() {
    modal.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

Modal.propTypes = {
  children: PropTypes.array
}

function Child() {
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  )
}

export default class PortalMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicks: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render() {
    return (
      <div onClick={ this.handleClick }>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Check the DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    )
  }
}
