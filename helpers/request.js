const fetch = require('node-fetch')
const assert = require('assert')
const BASE_URL = 'https://api.cedarmaps.com/v1'
module.exports = (token) => ({url, body, method}) => {
	const options = {
		method,
		body: JSON.stringify(body),
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}
	return new Promise((resolve, reject) => {
		fetch(`${BASE_URL}/${url}`, options)
			.then(response => {
				if (!response.ok) {
					return reject({body, message: `Received status ${response.status} from cedar API engine`})
				}
				return response.json()
			}).then(body => {
			if (body.status && body.status !== 'OK') {
				return reject(body)
			}
			const results = body.results || body.result || body
			return resolve(results)
		}).catch(err => {
			return reject(err)
		})
	})
}
