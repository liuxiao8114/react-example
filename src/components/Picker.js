import React from 'react'
import PropTypes from 'prop-types'

export default class Picker extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e)
  }

  render() {
    return (
      <div>
        <input value={this.props.value} onChange={this.handleChange} />
      </div>
    )
  }
}

Picker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
