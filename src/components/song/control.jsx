import React from 'react'

const Control = props => {
  return (
    <div
      onMouseDown={props.dragHandler}
      className="song__control"
      style={{
        left: `${(props.time / props.duration) * 98}%`,
      }}
    ></div>
  )
}

export default Control
