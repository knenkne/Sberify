import React from 'react'

import { NavLink } from 'react-router-dom'

import '../App.scss'

const Album = props => {
  return (
    <li className="album">
      <NavLink
        to={`/album/${encodeURIComponent(props.name)}`}
        style={{ textDecoration: 'none' }}
      >
        <img src={props.image} alt={props.name} />
        <h3>{props.name}</h3>
        <span>{props.date}</span>
      </NavLink>
    </li>
  )
}

export default Album
