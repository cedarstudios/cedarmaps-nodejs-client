const queryString = require('query-string')
const requestHelper = require('../helpers/request')

const _ = require('lodash')
module.exports = ({token}) => {

	const GenerateForwardGeocodingUrl = (points) => {
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

	return (points) => {
		if (!points || !Array.isArray(points) || !points.length % 2 === 1) throw Error('Invalid points provided')
		return requestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(points)})
	}

}
