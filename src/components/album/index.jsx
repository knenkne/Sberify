import React from 'react'
import { NavLink } from 'react-router-dom'

const Album = ({ image, name, date }) => {
  return (
    <li className="album">
      <NavLink
        to={`/album/${encodeURIComponent(name)}`}
        style={{ textDecoration: 'none' }}
      >
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <span>{date}</span>
      </NavLink>
    </li>
  )
}

export default Album
