'use strict'
const Constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}
	const RequestHelper = require('./helpers/request')(token)
	const forwardGeocoding = require('./v1/forward-geocoding')({RequestHelper})
	const reverseGeocoding = require('./v1/reverse-geocoding')({RequestHelper})
	const distance = require('./v1/distance')({RequestHelper})
	const direction = require('./v1/direction')({RequestHelper})
	const tile = require('./v1/tile')({RequestHelper})

	return {
		distance,
		direction,
		tile,
		forwardGeocoding,
		reverseGeocoding,
		Constants
	}
}
