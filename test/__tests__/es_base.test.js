describe('javascript basic', () => {
  it('new an variable', () => {
    function Foo() { this.foo = 'f' }
    function Bar() { this.bar = 'b' }
    let x = Foo

    expect(new x().foo).toBe('f')
  })
})
