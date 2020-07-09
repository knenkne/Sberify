import React from 'react'
import { Helmet } from 'react-helmet'
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
    <React.Fragment>
      <Helmet>
        <title>{this.props.name}</title>
        <meta property="og:site_name" content="Sberify Music App" />
        <meta property="og:type" content="music.radio_station" />
        <meta property="og:title" content="Sberify" />
        <meta property="og:description" content="Most awesome music app ever" />
        <meta
          property="og:image"
          content="https://apptractor.ru/wp-content/uploads/2017/02/sber.png"
        />
      </Helmet>
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
    </React.Fragment>
  )
}

export default App
