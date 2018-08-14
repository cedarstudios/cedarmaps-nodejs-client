const queryString = require('query-string')
const _ = require('lodash')
const Q = require('q')
module.exports = ({RequestHelper}) => {
	const GenerateDirectionUrl = (points, options) => {
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

	return (points, options = {}, callback) => {
		const deferred = Q.defer()
		if (points.length === 0 || points.length % 2 !== 0) deferred.reject(Error('Invalid points provided'))
		try {
			const promise = RequestHelper({
				method: 'GET',
				url: GenerateDirectionUrl(points, options)
			})
			deferred.resolve(promise)
		} catch (e) {
			deferred.reject(e)
		}
		deferred.promise.nodeify(callback)
		return deferred.promise
	}
}
