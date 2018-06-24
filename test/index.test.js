const test = require('ava')

const index = require('../index')
const validExports = [
	'distance',
	'direction',
	'tile',
	'forwardGeocoding',
	'reverseGeocoding',
	'Constants'
]

test('Should export a function', t => {
	t.is(typeof index, 'function')
})
test('Should fail when not providing API key', t => {
	t.throws(() => index(), Error)
})

test('Should not accept none string API key', t => {
	t.throws(() => index(123), Error)
})

test('Should export valid properties', t => {
	t.plan(validExports.length)
	const exportedObjects = index('123')
	const keys = Object.keys(exportedObjects)
	keys.forEach(key => {
		if (validExports.includes(key)) {
			t.pass()
		}
	})

})

