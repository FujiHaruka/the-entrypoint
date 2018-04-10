/**
 * Register service workers
 * @function workers
 * @param {string[]} swUrls - Service worker urls
 * @returns {Promise.<void>}
 */
'use strict'

const {get} = require('the-window')

const fullPath = (url) => new URL(url, location.href).href

/** @lends workers */
async function workers (swUrls, options = {}) {
  const {scope = '/'} = options
  const serviceWorker = get('navigator.serviceWorker')
  if (!serviceWorker) {
    return
  }
  for (const url of swUrls) {
    await serviceWorker.register(url, {scope})
  }
  const registrations = await serviceWorker.getRegistrations()
  for (const registration of registrations) {
    const {scriptURL} = registration.active || {}
    if (!scriptURL) {
      continue
    }
    const scriptChanged = !swUrls.map((url) => fullPath(url)).includes(scriptURL)
    if (scriptChanged) {
      await registration.unregister()
      console.warn(`[TheEntrypoint] Unregister worker with script`, scriptURL)
    }
    const scopeChanged = fullPath(scope) !== registration.scope
    if (scopeChanged) {
      await registration.unregister()
      console.warn(`[TheEntrypoint] Unregister worker with scope`, registration.scope)
    }
  }
}

module.exports = workers
