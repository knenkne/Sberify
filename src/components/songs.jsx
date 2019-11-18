import React from 'react'

import Song from './song'

const Songs = props => {
  return (
    <article className="songs">
      <h4>{props.title}</h4>
      <ul>
        {props.songs.map((song, index) => (
          <Song
            index={props.isNumbered && index + 1}
            key={song.name}
            name={song.name}
            artist={props.artist}
            image={song.image || props.image}
            url={song.songPlayerUrl}
          />
        ))}
      </ul>
    </article>
  )
}

export default Songs
