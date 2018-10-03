import React from 'react'
import App from ''

function isClass(type) {
  return (
    Boolean(type.prototype) &&
    Boolean(type.prototype.isReactComponent)
  )
}

function mountComposite(element) {
  const { type, props } = element
  let renderedElement

  if(isClass(type)) {
    let publicInstance = new type(props)

    publicInstance.props = props
    if(publicInstance.componentWillMount)
      publicInstance.componentWillMount()
    renderedElement = publicInstance.render()
  } else {
    renderedElement = type(props)
  }

  return mount(renderedElement)
}

function mountHost(element) {
  const { type, props } = element
  let children = props.children || []
  if(!Array.isArray(children)) {
    children = [ children ]
  }

  children = children.filter(Boolean)

  let node = document.createElement(type)

  Object.keys(props).forEach(key => {
    key !== 'children' && node.setAttribute(key, props[key])
  })

  children.forEach(child => {
    node.appendChild(mount(child))
  })

  return node
}

function mount(element) {
  let type = typeof element.type
  if(type === 'function') {
    return mountComposite(element)
  } else if(type === 'string') {
    return mountHost(element)
  }
}

// test
let rootEl = document.getElementById('root')
rootEl.appendChild(mount(<App />))
