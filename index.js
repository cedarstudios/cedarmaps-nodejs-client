'use strict'
const constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}

	const ForwardGeocoding = require('./v1/forward-geocoding')({token})
	const ReverseGeocoding = require('./v1/reverse-geocoding')({token})
	const Distance = require('./v1/distance')({token})
	const Direction = require('./v1/direction')({token})
	const Tile = require('./v1/tile')({token})

	return {
		Distance,
		Direction,
		Tile,
		ForwardGeocoding,
		ReverseGeocoding,
		constants
	}
}
