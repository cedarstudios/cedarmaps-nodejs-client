const {INDEXES:{STREET_INDEX}} = require('../constants')
const validIndex = [STREET_INDEX]
const Q = require('q')

module.exports = ({RequestHelper}) => {
	const GenerateForwardGeocodingUrl = (lat, lon, index) => {
		if (!lat || !lon) throw Error('Invalid lat or lon provided')

		return `geocode/${index}/${lat},${lon}.json`
	}


	return (lat, lon, index = STREET_INDEX, callback) => {
		const deferred = Q.defer()
		if (!validIndex.includes(index)) deferred.reject(Error('Invalid reverse geocode index provided'))
		deferred.resolve(RequestHelper({method: 'GET', url: GenerateForwardGeocodingUrl(lat, lon, index)}))
		deferred.promise.nodeify(callback)
		return deferred.promise
	}
}
