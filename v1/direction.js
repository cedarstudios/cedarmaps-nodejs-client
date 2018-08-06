const queryString = require('query-string')
const _ = require('lodash')
const Q = require('q')
module.exports = ({RequestHelper}) => {
	const GenerateForwardGeocodingUrl = (points, options) => {
		const {instructions} = options
		const {url} = points.reduce((result, currentPoint, index) => {
			if (index % 2 === 0) {
				result.previousPoint = currentPoint
				return result
			}
			const {lat: firstLat, lon: firstLon} = result.previousPoint
			const {lat: secondLat, lon: secondLon} = currentPoint
			if (!firstLat || !firstLon || !secondLat || !secondLon) throw Error('Invalid lat or lon provided')
			result.url = result.url.concat(`${firstLat},${firstLon};${secondLat},${secondLon}/`)
			return result
		}, {url: 'direction/cedarmaps.driving/', previousPoint: null})

		return `${url.slice(0, -1)}?${queryString.stringify(_.pickBy({
			instructions: !!instructions
		}, undefined))}`
	}

	return (firstPoint, secondPoint, options = {}, callback) => {
		const deferred = Q.defer()
		if (!firstPoint || !secondPoint) deferred.reject(Error('Invalid points provided'))
		try {
			const promise = RequestHelper({
				method: 'GET',
				url: GenerateForwardGeocodingUrl([firstPoint, secondPoint], options)
			})
			deferred.resolve(promise)
		} catch (e) {
			deferred.reject(e)
		}
		deferred.promise.nodeify(callback)
		return deferred.promise
	}
}
