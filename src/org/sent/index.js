// import $ from 'jQuery';

import './sent.scss';
import './message-overlay.scss';
import {
	getSentMessagesTmplStr
} from './sentMessages';

import {
	getMsgOverlayTmplStr
} from './msgOverlay';

let msgs = [];

render();

export function addMsg(msg) {
	msgs.unshift(msg);
	render();
}
export function deleteMsg(msgId) {
	msgs.forEach(function (msg) {
		if (msg.id === msgId) {
			msgs.splice(msgs.indexOf(msg), 1);
			render();
			return;
		}
	});
}
export function getMsgs() {
	return msgs;
}

function render() {
	$('.sent-container .message-list')
		.html(getSentMessagesTmplStr(msgs));
}
// load sent msgs
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_sentbox: ''
	},
	type: 'POST'
}).done(function (msgs) {
	try {
		msgs = JSON.parse(msgs);
		msgs.forEach(function (msg) {
			addMsg(msg);
		});
	} catch (e) {
		console.log('Parse error', e);
	}
});

$('body').on('click', '.sent-container .message', function () {
	let dataNotificationId = $(this).attr('data-notification-id');
	msgs.forEach(function (message) {
		// console.log(message);
		if (message.id === dataNotificationId) {
			// show message
			$('.sent-container').hide();
			$('.message-overlay-container').fadeIn();
			$('.message-overlay-container').html(getMsgOverlayTmplStr(message));
		}
	});
});
