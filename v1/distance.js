const Q = require('q')

module.exports = ({RequestHelper}) => {

	const GenerateDistanceMatrixUrl = (points) => {
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
		}, {url: 'distance/cedarmaps.driving/', previousPoint: null})
		return url.slice(0, -1)
	}

	return (points, callback) => {
		const deferred = Q.defer()
		if (!points || !Array.isArray(points) || points.length % 2 === 1) deferred.reject(Error('Invalid points provided'))
		try {
			const promise = RequestHelper({method: 'GET', url: GenerateDistanceMatrixUrl(points)})
			deferred.resolve(promise)
		} catch (e) {
			deferred.reject(e)
		}
		deferred.promise.nodeify(callback)
		return deferred.promise
	}

}
