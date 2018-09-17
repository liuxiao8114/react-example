import React from 'react'
import { Provider } from 'react-redux'
import AsyncApp from './containers/AsyncApp'
import DevTools from './containers/DevTools'
import configureStore from './store'

const Root = () => {
  return (
    <Provider store={configureStore()}>
      <div>
        <AsyncApp/>
        <DevTools/>
      </div>
    </Provider>
  )
}

export default Root
