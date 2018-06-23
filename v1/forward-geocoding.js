const queryString = require('query-string')
const requestHelper = require('../helpers/request')
const validIndex = ['cedarmaps.streets']
const {FORWARD_GEOCODE: {STREET_INDEX}} = require('../constants')

const _ = require('lodash')
module.exports = ({token}) => {

	const GenerateForwardGeocodingUrl = (query, index, filters = {}) => {
		const {limit, distance, location, type: inputTypes, ne, sw} = filters
		let validLocation = ''
		let validNe = ''
		let validSw = ''
		if (location && location.lat && location.lon) {
			validLocation = `${location.lat},${location.lon}`
		}
		if (ne && ne.lat && ne.lon) {
			validNe = `${ne.lat},${ne.lon}`
		}
		if (location && location.lat && location.lon) {
			validSw = `${sw.lat},${sw.lon}`
		}
		let type = []
		if (Array.isArray(inputTypes))
			type = inputTypes.join(',')
		return `geocode/${index}/${query}.json?${queryString.stringify(_.pickBy({
			limit,
			distance,
			type,
			location: validLocation,
			ne: validNe,
			sw: validSw
		}, undefined))}`
	}

	return (query, index = STREET_INDEX, filters = {}) => {

		if (!validIndex.includes(index)) throw new Error('Invalid forward geocod index provided')
		return requestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(query, index, filters)})
	}

}
