'use strict'
const constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}
	const RequestHelper = require('./helpers/request')(token)
	const ForwardGeocoding = require('./v1/forward-geocoding')({RequestHelper})
	const ReverseGeocoding = require('./v1/reverse-geocoding')({RequestHelper})
	const Distance = require('./v1/distance')({RequestHelper})
	const Direction = require('./v1/direction')({RequestHelper})
	const Tile = require('./v1/tile')({RequestHelper})

	return {
		Distance,
		Direction,
		Tile,
		ForwardGeocoding,
		ReverseGeocoding,
		constants
	}
}
