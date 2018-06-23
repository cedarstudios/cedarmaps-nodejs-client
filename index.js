'use strict'
const constants = require('./constants')
module.exports = (token) => {
	if (typeof token !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof token}`)
	}

	const ForwardGeocoding = require('./v1/forward-geocoding')({token})
	return {
		ForwardGeocoding,
		constants
	}
}
