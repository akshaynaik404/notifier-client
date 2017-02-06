import $ from 'jQuery';

import './inbox.scss';

// import {
// 	api
// } from '../api/api';
import {
	getRecievedMailsStr
} from './mails-template';

// console.log('inbox.js loaded');
// let recievedMails = api.getRecievedMails();

let msgs = [];
let $msgList = $('.inbox-container .message-list');

_render();

export function addMsg(msg) {
	msgs.push(msg);
	_render();
}

function _render() {
	$msgList.html(getRecievedMailsStr(msgs));
}

// load inbox
$.ajax({
	url: '/server/personal_home.php',
	data: {
		inbox: ''
	},
	type: 'POST'
}).done(function (recievedMails) {
	console.log(recievedMails);
	try {
		recievedMails = JSON.parse(recievedMails);
		recievedMails.forEach(function (mail) {
			addMsg(mail);
		});
	} catch (e) {
		console.log('Parse error');
	}
});


$('body').on('click', '.inbox-container .message button.delete', function () {
	// console.log('clicked delete btn');
	let $clickedBtn = $(this);
	let msgId = $(this).attr('data-message-id');
	let confirmDelete = confirm('Confirm Deletion');

	if (confirmDelete) {
		$.ajax({
			url: '/server/message.php',
			data: {
				message_id: msgId,
				acc_type: 'personal',
				table_name: 'recipients',
			},
			type: 'POST'
		}).done(function (data) {
			data = $.trim(data);
			if (data === '1') {
				msgs.forEach(function (msg) {
					if (msg.id === msgId) {
						$clickedBtn.parents('.message').remove();
					}
				});
			} else if (data === '0') {
				console.log('db error');
			} else {
				console.log('server errror');
			}
		});
	}
});
