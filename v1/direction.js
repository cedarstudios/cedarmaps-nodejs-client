const queryString = require('query-string')
const pickBy = require('lodash.pickby')
const Q = require('q')
module.exports = ({RequestHelper}) => {
	const GenerateDirectionUrl = (points, options) => {
		const {instructions} = options
		points.forEach(point => {
			if(!point.lat || !point.lon) throw Error('Invalid lat or lon provided')
		})
		const url = `direction/cedarmaps.driving/${points.map(point => `${point.lat},${point.lon}`).join(';')}`

		return `${url}?${queryString.stringify(pickBy({
			instructions: !!instructions
		}, undefined))}`
	}

	return (points, options = {}, callback) => {
		const deferred = Q.defer()
		if (points.length === 0 || points.length === 1) deferred.reject(Error('Invalid points provided'))
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
