import React from 'react'
import '../App.scss'

const Album = props => {
  return (
    <li className="album">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <span>{props.date}</span>
    </li>
  )
}

export default Album
