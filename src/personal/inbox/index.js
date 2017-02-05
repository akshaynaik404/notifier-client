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



// load inbox
$.ajax({
	url: '/server/personal_home.php',
	data: {
		inbox: ''
	},
	type: 'POST'
}).done(function (recievedMails) {
	// console.log(recievedMails);
	try {
		recievedMails = JSON.parse(recievedMails);
	} catch (e) {
		console.log('Parse error');
	}
	$('.inbox-container .message-list').append(getRecievedMailsStr(recievedMails));
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
				$clickedBtn.parents('.message').remove();
			} else if (data === '0') {
				console.log('db error');
			} else {
				console.log('server errror');
			}
		});
	}
});
