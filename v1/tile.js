module.exports = ({token, RequestHelper}) => {
	const GenerateForwardGeocodingUrl = (mapId) => {
		return `tiles/${mapId}.json`
	}
	return (mapId) => {
		if (!mapId) throw new Error('Invalid map ID provided')
		return RequestHelper({method: 'GET', token, url: GenerateForwardGeocodingUrl(mapId)})
	}

}
