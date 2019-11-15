export const normalizeNameToLink = name => {
  return name
    .split('')
    .map(letter => (letter === ' ' ? '-' : letter))
    .join('')
}

export const normalizeLinkToName = name => {
  return name
    .split('')
    .map(letter => (letter === '-' ? ' ' : letter))
    .join('')
}
