import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Preloader from './components/preloader'
import Artist from './routes/artist'
import Album from './routes/album'
import Song from './routes/song'
import NotFound from './components/404'

import './App.scss'

function App() {
  return (
    <React.Fragment>
      {/* <Switch> */}
      <Preloader />
      {/* Home */}
      <Switch>
        <Route path="/artist/:name" component={Artist} />
        <Route path="/album/:name" component={Album} />
        <Route path="/song/:name" component={Song} />
        <Route component={NotFound} />
      </Switch>
      {/* </Switch> */}
    </React.Fragment>
  )
}

export default App
