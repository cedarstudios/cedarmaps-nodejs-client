import test from 'ava';
import cedarMaps from '.';

test('title', t => {
	const err = t.throws(() => {
		cedarMaps(123);
	}, TypeError);
	t.is(err.message, 'Expected a string, got number');

	t.is(cedarMaps('unicorns'), 'unicorns & rainbows');
});
