const symbolsMap = {
  ' ': '-',
  '&': 'and',
  '…': ' ',
  '’': ' '
}

export const normalizeNameToLink = name =>
  name
    .split('')
    .map(letter => symbolsMap[letter] || letter)
    .join('')
    .replace(/[^A-Za-z0-9]+/g, '-')

export const normalizeLinkToName = name =>
  name
    .split('')
    .map(letter => (letter === '-' ? ' ' : letter))
    .join('')
