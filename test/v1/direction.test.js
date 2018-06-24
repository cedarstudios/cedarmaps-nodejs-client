const test = require('ava')
const {CreateValidRequestMock} = require('../_helpers')

let validPoint1 = {lat: 1, lon: 1}
let validPoint2 = {lat: 2, lon: 2}
test.beforeEach(t => {
	validPoint1 = {lat: 1, lon: 1}
	validPoint2 = {lat: 2, lon: 2}
})

test('Should accept first and second valid points and options as arguments', t => {
	const Direction = require('../../v1/direction')({RequestHelper: CreateValidRequestMock({ignore: true})})
	t.throws(() => Direction(1), Error)
	t.throws(() => Direction(1, 2), Error)
	t.throws(() => Direction(1, 2, 3), Error)
	t.notThrows(() => Direction(validPoint1, validPoint2), Error)
})
test('Should return a promise', t => {
	const Direction = require('../../v1/direction')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = Direction(validPoint1, validPoint1)
	return result.then(() => t.pass()).catch(() => t.pass())
})

test('Should create valid url when valid direction args provided', t => {
	const validUrl = 'direction/cedarmaps.driving/1,1;2,2?'
	const Direction = require('../../v1/direction')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => Direction(validPoint1, validPoint2), Error)
})

test('Should create valid url when valid direction args and valid option provided', t => {
	const validUrl = 'direction/cedarmaps.driving/1,1;2,2?instructions=true'
	const Direction = require('../../v1/direction')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => Direction(validPoint1, validPoint2, {instructions: true}), Error)
})
