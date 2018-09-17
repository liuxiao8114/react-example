import React from 'react'
import classNames from 'classnames'

function reduce(a, fn, init) {
  if(!a || !(a instanceof Array))
    throw new Error(`only accept Array but ${ a.constructor } received.`)
  if(a.length === 0) return init

  return reduce(init ? a.slice(1) : a.slice(2), fn, init ? fn(init, a[0]) : fn(a[0], a[1]))
}

Array.prototype.selfReduce = function(fn, init) {
  return reduce(this, fn, init)
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          Reduce [ 4, 2, 1, 4, 8, 1 ] with muti using reduce(a, fn, init) :
          { reduce([ 4, 2, 1, 4, 8, 1 ], (a, b) => a * b, 1) }
        </div>
        <div>
          Reduce [ 4, 2, 1, 4, 8, 1 ] with muti using Array.prototype.selfReduce :
          { [ 4, 2, 1, 4, 8, 1 ].selfReduce((a, b) => a * b, 1) }
        </div>
        <div className='detail-hint-in'>
          This is onHover box~
        </div>
      </div>
    )
  }
}

/*
let funcs = []
funcs.reduce((a, b) => (...args) => a(b(...args)))

// init(fn1(fn2(fn3(...args))))
*/
