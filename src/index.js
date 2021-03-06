import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Root from './root'
import Calculator from '../officals/lifting-state-up'
import PortalMain from '../officals/portals'

ReactDOM.render(
  <div>
    <div>
      This is the world of React!
      <App/>
    </div>
    <div>
      This is thie world of Redux connecting React!
      <Root/>
    </div>
    <Calculator/>
    <PortalMain/>
  </div>,
  document.getElementById('app')
)
