import React from 'react'
import ReactDOM from 'react-dom'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { shallow } from 'enzyme'
import { configure } from 'enzyme'

import App from './App'
import Home from './routes/home'
import { Artist } from './routes/artist'
import mockData from './mock-data'

const mockStore = configureStore([thunkMiddleware])
let store

beforeEach(() => {
  store = mockStore(initialState)
})

const initialState = {
  app: {
    searchResults: [],
    isLoading: false,
    redirectUri: '',
    error: null
  }
}

configure({ adapter: new Adapter() })

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('Searchmode change on click', () => {
  const home = renderer.create(<Home store={store} />)
  const homeInstance = home.root
  const search = homeInstance.findByProps({ type: 'text' })

  let tree = home.toJSON()
  expect(tree).toMatchSnapshot()

  search.props.onFocus()

  tree = home.toJSON()
  expect(tree).toMatchSnapshot()

  search.props.onBlur()

  tree = home.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Search artists', () => {
  const mock = new MockAdapter(axios)

  mock.onGet('/api/artist/Architects').reply(
    200,
    mockData.find(artist => artist.name === 'Architects')
  )

  axios.get('/api/artist/Architects').then(response => {
    expect('Architects').toEqual(response.data.name)
  })
})

test('Artist renders without crashing', () => {
  const artist = shallow(
    <Artist
      {...mockData[0]}
      clearArtists={() => console.log('Clear')}
      initArtist={() => console.log('Init')}
      match={{
        params: {
          name: 'Architects'
        }
      }}
    />
  )

  expect(artist.find('.artist__name').text()).toEqual('Architects')
})
