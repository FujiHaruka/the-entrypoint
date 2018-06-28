/**
 * Apply patch
 * @function patch
 */
'use strict'

const {isiOS, unlessProduction} = require('the-check')
const {get} = require('the-window')
const createStyleElement = require('./helpers/createStyleElement')

/** @lends patch */
function patch () {
  if (isiOS) {
    patch.ios()
  }
}

Object.assign(patch, {
  ios () {
    {
      const document = get('document')
      const style = createStyleElement(`
input[type='text'],
input[type='number'],
input[type='password'],
input[type='search'],
input[type='tel'],
textarea {
  font-size: 16px;
}
      `.trim(), {className: 'the-entrypoint-ios-patch'})
      document.head.appendChild(style)
    }

    unlessProduction(() => {
      console.log(`[TheEntrypoint] iOS patch apply`)
    })
  },
})

module.exports = patch
