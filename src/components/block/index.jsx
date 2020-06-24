import React from 'react'

const Block = ({ title, children }) => (
  <article className="block">
    <h4>{title}</h4>
    {children}
  </article>
)

export default Block
