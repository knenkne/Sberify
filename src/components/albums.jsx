import React from 'react'

import Album from './album'

class Albums extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <article className="albums">
        <h4>{this.props.title || 'Latest Albums'}</h4>
        <ul>
          {this.props.albums.map(album => (
            <Album
              key={album.name}
              name={album.name}
              date={album.date}
              image={album.image}
            />
          ))}
        </ul>
      </article>
    )
  }
}

export default Albums
