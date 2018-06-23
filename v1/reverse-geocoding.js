const queryString = require('query-string')
const requestHelper = require('../helpers/request')
const {FORWARD_GEOCODE: {STREET_INDEX}} = require('../constants')
const validIndex = [STREET_INDEX]

const _ = require('lodash')
module.exports = ({token}) => {
	const GenerateForwardGeocodingUrl = (lat, lon, index) => {
		if (!lat || !lon) throw Error('Invalid lat or lon provided')

		return `geocode/${index}/${lat},${lon}.json`
	}
	return (lat, lon, index = STREET_INDEX) => {

		if (!validIndex.includes(index)) throw new Error('Invalid forward geocode index provided')
		return requestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(lat, lon, index)})
	}

}
