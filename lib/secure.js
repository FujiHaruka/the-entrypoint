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
  const shouldSkip = [location.host, location.hostname].some((v) => v === ignore)
  if (shouldSkip) {
    return
  }
  if (location.protocol === from) {
    console.log(`[the-entrypoint] redirect "${from}" -> "${to}"`)
    location.protocol = to
  }
}

module.exports = secure
