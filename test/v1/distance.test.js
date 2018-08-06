const test = require('ava')
const {CreateValidRequestMock} = require('../_helpers')

let validPoint1 = {lat: 1, lon: 1}
let validPoint2 = {lat: 2, lon: 2}
let validPoint3 = {lat: 3, lon: 3}
let validPoint4 = {lat: 4, lon: 4}
test.beforeEach(t => {
	validPoint1 = {lat: 1, lon: 1}
	validPoint2 = {lat: 2, lon: 2}
	validPoint3 = {lat: 3, lon: 3}
	validPoint4 = {lat: 4, lon: 4}
})

test('Should not accept odd number or invalid points as argument', async t => {
	const Distance = require('../../v1/distance')({RequestHelper: CreateValidRequestMock({ignore: true})})
	await t.throws(Distance(), Error)
	await t.throws(Distance(1), Error)
	await t.throws(Distance([validPoint1]), Error)
	await t.throws(Distance([validPoint1, {lat: 1}]), Error)
	await t.notThrows(Distance([validPoint1, validPoint2]), Error)
})
test('Should return a promise', t => {
	const Distance = require('../../v1/distance')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = Distance([validPoint1, validPoint1])
	return result.then(() => t.pass()).catch(() => t.pass())
})

test.cb('Should accept callback', t => {
	const Distance = require('../../v1/distance')({RequestHelper: CreateValidRequestMock({ignore: true})})
	Distance([validPoint1, validPoint1], t.end())
})
test('Should create valid url when valid distance for two point provided', t => {
	const validUrl = 'distance/cedarmaps.driving/1,1;2,2'
	const Distance = require('../../v1/distance')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => Distance([validPoint1, validPoint2]), Error)
})

test('Should create valid url when valid distance for more than two points provided', t => {
	const validUrl = 'distance/cedarmaps.driving/1,1;2,2/3,3;4,4'
	const Distance = require('../../v1/distance')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => Distance([validPoint1, validPoint2, validPoint3, validPoint4]), Error)
})
