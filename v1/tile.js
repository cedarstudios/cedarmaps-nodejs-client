const Q = require('q')

module.exports = ({token, RequestHelper}) => {
	const GenerateForwardGeocodingUrl = (mapId) => {
		return `tiles/${mapId}.json`
	}
	return (mapId, callback) => {
		const deferred = Q.defer()
		if (!mapId) deferred.reject(Error('Invalid map ID provided'))
		deferred.resolve(RequestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(mapId)}))
		deferred.promise.nodeify(callback)
		return deferred.promise
	}

}
