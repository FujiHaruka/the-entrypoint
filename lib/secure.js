/**
 * Make sure to be secure
 * @function secure
 * @param {Object} [options={}] - Optional settings
 */
'use strict'

const {get} = require('the-window')

/** @lends secure */
function secure (options = {}) {
  const {
    from = 'http:',
    ignore = 'localhost',
    to = 'https:',
  } = options
  const location = get('location')
  const compare = (host) => {
    if (typeof ignore === 'string') {
      return v === ignore
    } else if (Array.isArray(ignore)) {
      return ignore.includes(host)
    } else {
      console.warn(`[the-entrypoint] "ignore" option must be string or array`)
      return true     
    }      
  }
  const shouldSkip = [location.host, location.hostname].some(compare)
  if (shouldSkip) {
    return
  }
  if (location.protocol === from) {
    console.log(`[the-entrypoint] redirect "${from}" -> "${to}"`)
    location.protocol = to
  }
}

module.exports = secure
