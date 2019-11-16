import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'

import ReduxThunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly'

import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import * as reducers from './reducers'

export const createStore = () => {
  const composedEnhancer = compose(
    applyMiddleware(thunkMiddleware, logger, ReduxThunk),
    devToolsEnhancer({
      name: 'Sberify'
    })
  )

  return createReduxStore(combineReducers(reducers), composedEnhancer)
}
