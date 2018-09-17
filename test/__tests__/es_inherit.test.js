function SpecialArray() {
  let values = new Array()

  values.push.apply(values, arguments)
  values.toPipedString = function() {
    return this.join('|')
  }

  return values
}

function Person(name, age, job) {
  let o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function() {
    alert(this.name)
  }

  return o
}

function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function SubType() {

}

function SuperType(name) {
  this.name = name
}

function inheritPrototype(subType, superType) {
  const prototype = Object.create(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

describe('javascript inherit', () => {
  const a = 'a', getA = 'getA', getB = 'getB'

  function A() { this.a = a }
  A.prototype.getA = function() { return getA }

  function B() { this.b = 'b' }
  Object.setPrototypeOf(B.prototype, new A())
  B.prototype.getB = function() { return getB }

  class C extends A {
    constructor() {
      super()
      this.c = 'c'
    }
  }

  function D() {
    const o = Object.create(new A())
    o.d = 'd'
    return o
  }
  /*
      B.__proto__ = A
      B.prototype.__proto__ = A.prototype
  */

  it('parasitic inherit', () => {
    inheritPrototype(SubType, SuperType)
    expect(Object.getPrototypeOf(Object.getPrototypeOf(SubType)))
      .toEqual(SuperType.prototype)
    expect(SubType.prototype.constructor).toBe(SubType)
    expect(SuperType.prototype.constructor).toBe(SuperType)
  })

  it('es6 inherit using setPrototypeOf', () => {
    const b = new B()
    const c = new C()
    const d = new D()

    expect(b.a).toBe(a)
    expect(b.getA()).toBe(getA)

    expect(c.a).toBe(a)
    expect(c.getA()).toBe(getA)

    expect(d.a).toBe(a)
    expect(d.getA()).toBe(getA)
  })

  it('object copy', () => {
    const person = {
      name: "Nicholas",
      friends: ["Shelby", "Court", "Van"]
    }
    const anotherPerson = object(person)
    expect(Object.getPrototypeOf(anotherPerson)).toBe(person)
    anotherPerson.name = "Greg"
    anotherPerson.friends.push("Rob")
    const yetAnotherPerson = object(person)
    yetAnotherPerson.name = "Linda"
    yetAnotherPerson.friends.push("Barbie")

    expect(person.name).toBe("Nicholas") //object()对传入其中的对象执行了一次浅复制
    expect(person.friends.length).toBe(5)
  })

})
