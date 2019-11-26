const symbolsMap = {
  ' ': '-',
  '&': 'and',
  '…': ' ',
  '’': ' '
}

const normalizeGeniusUrl = name =>
  name
    .split('')
    .map(letter => symbolsMap[letter] || letter)
    .join('')

module.exports = normalizeGeniusUrl
