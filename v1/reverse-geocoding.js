const Q = require('q');
const { INDEXES: { STREET_INDEX } } = require('../constants');

module.exports = ({RequestHelper}) => {
	
	const normalize = function(x) {
		if (x.lat !== undefined && x.lng !== undefined) {
			return x.lat + ',' + x.lng;
		} else if (x.lat !== undefined && x.lon !== undefined) {
			return x.lon + ',' + x.lat;
		} else {
			return x[0] + ',' + x[1];
		}
	}
	const GenerateReverseGeocodingUrl = (location, options) => {
		let optionsQueryString = '';
		const query = normalize(location);

		if (options.verbosity) {
			optionsQueryString += '&verbosity=' + options.verbosity;
		}

		if (options.prefix) {
			optionsQueryString += '&prefix=' + options.prefix;
		}


		return `geocode/${STREET_INDEX}/${query}.json?${optionsQueryString}`
	}

	return (location, options = {}, callback) => {
		const deferred = Q.defer()
		deferred.resolve(RequestHelper({method: 'GET', url: GenerateReverseGeocodingUrl(location, options)}))
		deferred.promise.nodeify(callback)
		return deferred.promise
	}
}
