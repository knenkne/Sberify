import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Preloader from './components/preloader'
import Artist from './routes/artist'
import Album from './routes/album'
import NotFound from './components/404'

import './App.scss'

function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default App
