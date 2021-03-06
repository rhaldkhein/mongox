'use strict'

const parallel = require('async.parallel')
const _reduce = require('lodash.reduce')
const _mapValues = require('lodash.mapvalues')
const { reducer } = require('./catchAll')
const { isMatchIn } = require('../utils')

module.exports = (toMatch, ...mids) => {

  mids = _reduce(mids, reducer, {})

  return (err, req, res, next) => {
    if (isMatchIn(err, toMatch)) {
      next(err)
    } else {
      parallel(
        _mapValues(mids, item => callback => item(req, res, callback)),
        newErr => next(newErr || err)
      )
    }
  }

}