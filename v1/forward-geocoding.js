const queryString = require('query-string')
const validIndex = ['cedarmaps.streets']
const {INDEXES: {STREET_INDEX}, FORWARD_GEOCODE: {TYPE}} = require('../constants')

const validTypes = Object.values(TYPE)
const _ = require('lodash')
module.exports = ({RequestHelper}) => {

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
		if (sw && sw.lat && sw.lon) {
			validSw = `${sw.lat},${sw.lon}`
		}
		let type = []
		if (inputTypes && Array.isArray(inputTypes)) {
			inputTypes.forEach(type => {
				if (!validTypes.includes(type)) throw Error('Invalid type provided')
			})
			type = inputTypes.join(',')
		}
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
		if (!validIndex.includes(index)) throw new Error('Invalid forward geocode index provided')
		return RequestHelper({method: 'GET', url: GenerateForwardGeocodingUrl(query, index, filters)})
	}

}
