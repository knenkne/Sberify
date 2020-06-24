import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './store'

import Preloader from './components/preloader'
import Home from './pages/home'
import Artist from './pages/artist'
import Album from './pages/album'
import Song from './pages/song'
import NotFound from './components/404'

import './App.scss'

function App() {
  return (
    <Provider store={createStore()}>
      <Router>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/artist/:name" component={Artist} />
          <Route path="/album/:name" component={Album} />
          <Route path="/song/:name" component={Song} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
