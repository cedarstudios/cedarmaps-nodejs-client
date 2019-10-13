const queryString = require('querystring')
const validIndex = ['cedarmaps.streets', 'cedarmaps.places', 'cedarmaps.mix']
const {INDEXES: {STREET_INDEX}, FORWARD_GEOCODE: {TYPE}} = require('../constants')
const Q = require('q')

const validTypes = Object.values(TYPE)
const pickBy = require('lodash.pickby')
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
		return `geocode/${index}/${query}.json?${queryString.stringify(pickBy({
			limit,
			distance,
			type: type.length ? type : null,
			location: validLocation,
			ne: validNe,
			sw: validSw
		}, undefined))}`
	}

	return (query, index = STREET_INDEX, filters = {}, callback) => {
		const deferred = Q.defer()
		if (!validIndex.includes(index)) deferred.reject(Error('Invalid forward geocode index provided'))
		deferred.resolve(RequestHelper({method: 'GET', url: GenerateForwardGeocodingUrl(query, index, filters)}))
		deferred.promise.nodeify(callback)
		return deferred.promise
	}
}
