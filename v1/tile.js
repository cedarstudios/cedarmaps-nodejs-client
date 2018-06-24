const requestHelper = require('../helpers/request')

module.exports = ({token}) => {
	const GenerateForwardGeocodingUrl = (mapId) => {
		return `tiles/${mapId}.json`
	}
	return (mapId) => {
		if (!mapId) throw new Error('Invalid map ID provided')
		return requestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(mapId)})
	}

}
