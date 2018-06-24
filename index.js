'use strict'
const constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}

	const ForwardGeocoding = require('./v1/forward-geocoding')({token})
	const ReverseGeocoding = require('./v1/reverse-geocoding')({token})
	const Distance = require('./v1/distance')({token})

	return {
		Distance,
		ForwardGeocoding,
		ReverseGeocoding,
		constants
	}
}
