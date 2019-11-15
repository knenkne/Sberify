import React from 'react'

import { Provider } from 'react-redux'
import { createStore } from './store'
import { BrowserRouter, Route } from 'react-router-dom'

import Preloader from './components/preloader'
import Artist from './components/artist'

import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <Provider store={createStore()}>
        <Preloader />
        {/* Home */}
        <Route exact path="/artist/:name" component={Artist} />
        {/* Album */}
        {/* Song */}
      </Provider>
    </BrowserRouter>
  )
}

export default App
