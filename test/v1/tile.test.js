const test = require('ava')
const {CreateValidRequestMock} = require('../_helpers')

test('Should accept map id as first argument', t => {
	const Tile = require('../../v1/tile')({RequestHelper: CreateValidRequestMock({ignore: true})})
	t.notThrows(() => Tile(1), Error)
})


test('Should return a promise', t => {
	const Tile = require('../../v1/tile')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = Tile(1)
	return result.then(() => t.pass()).catch(() => t.pass())
})


test.cb('Should accept callback', t => {
	const Tile = require('../../v1/tile')({RequestHelper: CreateValidRequestMock({ignore: true})})
	const result = Tile(1, t.end())
})

test('Should create valid url', t => {
	const validUrl = 'tiles/1.json'
	const Tile = require('../../v1/tile')({
		RequestHelper: CreateValidRequestMock({
			validMethod: 'GET',
			validUrl
		})
	})
	t.notThrows(() => Tile(1), Error)
})
