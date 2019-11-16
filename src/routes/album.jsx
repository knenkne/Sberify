import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'
import { normalizeLinkToName } from '../utils'

import Social from '../components/social'
import Songs from '../components/songs'
// import Album from '../components/album'
import Video from '../components/video'
import NotFound from '../components/404'

import twitter from '../lottie/twitter'
import facebook from '../lottie/facebook'
import instagram from '../lottie/instagram'

import '../App.scss'

const socialsMap = {
  twitter: {
    isLooped: true,
    data: twitter
  },
  facebook: {
    isLooped: true,
    data: facebook
  },
  instagram: {
    isLooped: false,
    data: instagram
  }
}

class Album extends React.Component {
  constructor(props) {
    super(props)

    this.props.initAlbum(this.props.match.params.name)
  }

  render() {
    return <div>Данные</div>
  }
}

const mapStateToProps = state => ({
  ...state.album
})

const mapDispatchToProps = {
  initAlbum: actions.initAlbum
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
