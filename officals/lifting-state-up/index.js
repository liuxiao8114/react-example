import React from 'react'
import PropTypes from 'prop-types'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function tryConvert(t, convert) {
  const input = parseFloat(t)

  if(Number.isNaN(input))
    return ''

  const output = convert(input)
  return Math.round(output * 1000) / 1000
}

function transFahrenheitToCelsius(f) {
  return (f - 32) * 5 / 9
}

function transCelsiusToFahrenheit(c) {
  return (c * 9 / 5) + 32
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.handleChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature,
          scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

TemperatureInput.propTypes = {
  scale: PropTypes.string.isRequired,
  temperature: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { temperature: '0' }

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleCelsiusChange(c) {
    this.setState({ temperature: c })
  }

  handleFahrenheitChange(f) {
    this.setState({ temperature: tryConvert(f, transFahrenheitToCelsius) })
  }

  render() {
    return (
      <div>
        <TemperatureInput scale="c" handleChange={this.handleCelsiusChange}
          temperature={this.state.temperature}/>
        <TemperatureInput scale="f" handleChange={this.handleFahrenheitChange}
          temperature={tryConvert(this.state.temperature, transCelsiusToFahrenheit)}/>
      </div>
    )
  }
}
