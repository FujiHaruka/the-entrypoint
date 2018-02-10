/**
 * Browser entrypoint for the-framework
 * @module the-entrypoint
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get history () { return _d(require('./history')) },
  get mount () { return _d(require('./mount')) },
}
