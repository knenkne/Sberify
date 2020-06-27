import React from 'react'

import Block from '../block'
import Album from './index'

const Albums = ({ albums }) => (
  <Block title="Latest Albums">
    <ul className="albums">
      {albums.map(({ name, date, image }) => (
        <Album key={name} name={name} date={date} image={image} />
      ))}
    </ul>
  </Block>
)

export default Albums
