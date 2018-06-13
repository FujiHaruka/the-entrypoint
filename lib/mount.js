/**
 * Mount element on DOM
 * @function mount
 * @param {*} element - React element
 * @param {string} containerId - Id of container dom
 * @param {object} [options] - Optional settings
 * @returns {Promise}
 */
'use strict'

const {createElement: c} = require('react')
const {render} = require('react-dom')
const {TheRouter} = require('the-router')
const {get} = require('the-window')
const history = require('./history')

/** @lends mount */
function mount (element, containerId, options = {}) {
  const {router = false} = options
  const document = get('window.document')
  const container = document && document.getElementById(containerId)
  if (!container) {
    throw new Error(`[the-entrypoint] Container not found with id: "${containerId}"`)
  }
  if (router) {
    element = c(TheRouter, {
      className: 'the-entrypoint-router',
      history: options.history || history(),
    }, element)
  }
  return new Promise((resolve) => {
    render(element, container, (...args) => {
      resolve({})
    })
  })
}

module.exports = mount
