'use strict'
const constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}
	const RequestHelper = require('./helpers/request')(token)
	const ForwardGeocoding = require('./v1/forward-geocoding')({token, RequestHelper})
	const ReverseGeocoding = require('./v1/reverse-geocoding')({token, RequestHelper})
	const Distance = require('./v1/distance')({token, RequestHelper})
	const Direction = require('./v1/direction')({token, RequestHelper})
	const Tile = require('./v1/tile')({token, RequestHelper})

	return {
		Distance,
		Direction,
		Tile,
		ForwardGeocoding,
		ReverseGeocoding,
		constants
	}
}
