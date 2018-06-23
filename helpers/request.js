const request = require('request')
const assert = require('assert')
const BASE_URL = 'https://api.cedarmaps.com/v1'
module.exports = ({token, url, body, method}) => {
	const options = {
		method,
		url: `${BASE_URL}/${url}`,
		body,
		json: true,
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	}
	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
			assert.equal(error, null)
			if (response.statusCode >= 400) {
				return reject({body, message: `Received status ${response.statusCode} from cedar API engine`})
			}
			if (body.result && body.result !== 'OK') {
				return reject(body)
			}
			const results = body.results || body
			return resolve(results)
		})
	})
}
