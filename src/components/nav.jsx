import React from 'react'

import { NavLink } from 'react-router-dom'

import '../App.scss'

const Nav = props => {
  return (
    <div className="navigation">
      <NavLink style={{ textDecoration: 'none' }} to="/">
        Home
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        exact
        to={`/artist/${props.artist}`}
      >
        Artist
      </NavLink>
      <NavLink style={{ textDecoration: 'none' }} to={`/album/${props.album}`}>
        Album
      </NavLink>
    </div>
  )
}

export default Nav
