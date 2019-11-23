import React from 'react'

import { NavLink } from 'react-router-dom'

import '../App.scss'

const links = {
  '/': 'Home',
  '/artist/': 'artist',
  '/album/': 'album',
  '/song/': 'song'
}

const Nav = props => {
  return (
    <div className="navigation">
      {Object.entries(links)
        .slice(0, props.count)
        .map(([slug, name]) => {
          return (
            <NavLink
              className="navigation__item"
              activeClassName="navgiation__item--current"
              style={{ textDecoration: 'none' }}
              exact
              to={`${slug}${props[name] || ''}`}
            >
              {name}
            </NavLink>
          )
        })}
    </div>
  )
}

export default Nav
