const KEY1 = 'KEY1'
const KEY2 = 'KEY2'
const KEY3 = 'KEY3'


describe('promise test cases', () => {
  it('one test', () => {
    function foo() {
      let a, b, c

      let p = new Promise(resolve => {
         a = KEY1
         resolve(a)
      })

      b = KEY2
      return p.then(data => data + KEY3 )
        .then(valueC => {
          c = valueC
          return { a, b, c }
        })
    }

    // let { a, b, c } = foo()

    return foo().then(({ a, b, c }) => {
      expect(a).toBe(KEY1)
      expect(b).toBe(KEY2)
      expect(c).toEqual(KEY1 + KEY3)
    })
  })
})

function fetch() {

}
