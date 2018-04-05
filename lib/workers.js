/**
 * Register service workers
 * @function workers
 * @param {string[]} swUrls - Service worker urls
 * @returns {Promise.<void>}
 */
'use strict'

const {get} = require('the-window')

/** @lends workers */
async function workers (swUrls) {
  const serviceWorker = get('navigator.serviceWorker')
  if (!serviceWorker) {
    return
  }
  for (const url of swUrls) {
    await serviceWorker.register(url)
  }
}

module.exports = workers