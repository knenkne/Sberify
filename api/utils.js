const normalizeUrl = (url) => url.replace(/[^a-zA-ZА-Яа-яЁё]/gi, ' ').replace(/\s+/gi, ' ')

module.exports = normalizeUrl