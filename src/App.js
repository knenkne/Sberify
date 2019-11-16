import React from 'react'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { Route, Switch } from 'react-router-dom'

import Preloader from './components/preloader'
import Artist from './routes/artist'
import Album from './routes/album'
import NotFound from './components/404'

import './App.scss'

function App() {
  return (
    <Provider store={createStore()}>
      {/* <Switch> */}
      <Preloader />
      {/* Home */}
      <Switch>
        <Route exact path="/artist/:name" component={Artist} />
        <Route exact path="/album/:name" component={Album} />
        {/* Song */}
        <Route component={NotFound} />
      </Switch>
      {/* </Switch> */}
    </Provider>
  )
}

export default App
