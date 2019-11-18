const symbolsMap = {
  ' ': '-',
  '&': 'and',
  '…': ' '
}

export const normalizeNameToLink = name =>
  name
    .split('')
    .map(letter => symbolsMap[letter] || letter)
    .join('')
    .replace(/[^a-zA-Z-]/g, '')

export const normalizeLinkToName = name =>
  name
    .split('')
    .map(letter => (letter === '-' ? ' ' : letter))
    .join('')
