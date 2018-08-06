const test = require('ava')
const {CreateValidRequestMock} = require('../_helpers')
let validPoint1 = {lat: 1, lon: 1}
let validPoint2 = {lat: 2, lon: 2}
const query = 'test'
const {INDEXES, FORWARD_GEOCODE} = require('../../constants')
const validIndexes = [INDEXES.STREET_INDEX]
test('Should accept required query as first arg', t => {
	const ForwardGeocoding = require('../../v1/forward-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	t.notThrows(() => ForwardGeocoding(1), Error)
})

test('Should not accept invalid index as second arg', async t => {
	const ForwardGeocoding = require('../../v1/forward-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	await t.throws(ForwardGeocoding(1, 2), Error)
})

test('Should return a promise when valid args provided', t => {
	const ForwardGeocoding = require('../../v1/forward-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = ForwardGeocoding(query, validIndexes[0])
	return result.then(() => t.pass()).catch(() => t.pass())
})

test.cb('Should accept callback', t => {
	const ForwardGeocoding = require('../../v1/forward-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	ForwardGeocoding(query, validIndexes[0], t.end())
})
test('Should create valid url when valid query provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0]), Error)
})


test('Should create valid url when valid query provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0]), Error)
})

test('Should create valid url when valid query with limit option provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?limit=1`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0], {limit: 1}), Error)
})

test('Should create valid url when valid query with distance option provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?distance=1`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0], {distance: 1}), Error)
})

test('Should create valid url when valid query with location option provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?location=1,1`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0], {location: validPoint1}), Error)
})

test('Should create valid url when valid query with type option provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?type=locality`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0], {type: [FORWARD_GEOCODE.TYPE.LOCALITY]}), Error)
})


test('Should create valid url when valid query with multi type option provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?type=locality,boulevard`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0],
		{type: [FORWARD_GEOCODE.TYPE.LOCALITY, FORWARD_GEOCODE.TYPE.BOULEVARD]}), Error)
})

test('Should not create valid url when invalid type option provided', t => {
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({ignore: true})
	})
	t.throws(() => ForwardGeocoding(query, validIndexes[0],
		{type: [1]}), Error)
})

test('Should create valid url when valid query provided', t => {
	const validUrl = `geocode/cedarmaps.streets/test.json?ne=1,1&sw=2,2`
	const ForwardGeocoding = require('../../v1/forward-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ForwardGeocoding(query, validIndexes[0], {ne: validPoint1, sw: validPoint2}), Error)
})
