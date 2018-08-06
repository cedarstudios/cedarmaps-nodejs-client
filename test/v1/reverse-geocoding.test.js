const test = require('ava')
const {CreateValidRequestMock} = require('../_helpers')
const {INDEXES: {STREET_INDEX}} = require('../../constants')
test('Should accept latitude and longitude as valid first and second arguments', t => {
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	t.throws(() => ReverseGeocoding(1), Error)
	t.notThrows(() => ReverseGeocoding(1, 2), Error)
})

test('Should not accept invalid index as third arguments', async t => {
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	await t.throws(ReverseGeocoding(1, 2, 3), Error)
})

test('Should accept valid index as third arguments', t => {
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	t.notThrows(() => ReverseGeocoding(1, 2, STREET_INDEX), Error)
})
test('Should return a promise', t => {
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = ReverseGeocoding(1, 2)
	return result.then(() => t.pass()).catch(() => t.pass())
})

test.cb('Should accept callback', t => {
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({RequestHelper: CreateValidRequestMock({ignore: true})})
	ReverseGeocoding(1, 2, t.end())
})
test('Should create valid url when valid direction args provided', t => {
	const validUrl = 'geocode/cedarmaps.streets/1,2.json'
	const ReverseGeocoding = require('../../v1/reverse-geocoding')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => ReverseGeocoding(1, 2), Error)
})
