function isClass(type) {
  return Boolean(type.prototype) &&
         Boolean(type.prototype.isReactComponent)
}

function instantiateComponent(element) {
  let type = typeof element.type
  if(type === 'function') {
    return new CompositeComponent(element)
  } else if(type === 'string'){
    return new DOMComponent(element)
  } else {
    throw new Error('Unknown type of element')
  }
}

class CompositeComponent {
  constructor(element) {
    this.currentElement = element
    this.renderedComponent = null
    this.publicInstance = null
  }

  getPublicInstance() {
    return this.publicInstance
  }

  mount() {
    let { type, props } = this.currentElement
    let publicInstance, renderedElement
    if(isClass(type)) {
      publicInstance = new type(props)
      if(publicInstance.componentWillMount)
        publicInstance.componentWillMount()
      renderedElement = publicInstance.render()
      this.publicInstance = publicInstance
    } else if(typeof type === 'function') {
      this.publicInstance = null
      renderedElement = type(props)
    } else {
      throw new Error('Unknown type in CompositeComponent process')
    }
    this.renderedComponent = instantiateComponent(renderedElement)

    return this.renderedComponent.mount()
  }
}

class DOMComponent {
  construcotr(element) {
    this.currentElement = element,
    this.renderedChildren = [],
    this.node = null
  }

  mount() {

  }
}
