export const normalizeNameToLink = name => {
  return name
    .split('')
    .map(letter => (letter === ' ' ? '-' : letter))
    .join('')
}
