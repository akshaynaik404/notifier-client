var assert = require('assert');
import {
	addMsg,
	getMsgs
} from './sent/';
describe('Org Page', function () {
	it('should run tests on Org page', function () {
		assert.equal(1, 1);
	});
	it('should add msg to msgs array', function () {
		let msgObj = {
			id: '123',
			to: '2222',
			subject: 'Subject line 1',
			body: 'Lorem ipsum dolor sit amet.',
			date: '18-Jan-2017',
			time: '7:19 PM'
		};
		addMsg(msgObj);
		assert.equal(msgObj, getMsgs()[getMsgs().length - 1]);
	})
});
