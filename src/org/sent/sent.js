// import $ from 'jQuery';

import {
	api
} from '../api/api';

import {
	deleteMsg
} from './';

$('body').on('click', '.message-overlay-container .back-to-sent', function () {
	$('.message-overlay-container').hide();
	$('.sent-container').show();
});

$('body')
	.on('click', '.sent-container .message-list .message .delete', function (e) {
		e.stopPropagation();
		e.preventDefault();
		let msgId = $(this).attr('data-notification-id');
		let confirmDelete = confirm('Confirm Delete');
		let $deleteBtn = $(this);
		console.log($deleteBtn);
		if (confirmDelete) {
			$deleteBtn.find('i').html('autorenew');
			$.ajax({
				url: '/server/message.php',
				data: {
					acc_type: 'org',
					table_name: 'sender',
					message_id: msgId
				},
				type: 'POST'
			}).done(function (data) {
				try {
					data = JSON.parse(data);
					deleteMsg(msgId);
				} catch (e) {
					console.log('Parse error');
					$deleteBtn.find('i').html('delete');
				}
			});
		}
	});

/**
 * delete message from inside overlay
 */
$('body').on('click', '.message-overlay-container .delete', function (e) {
	let $deleteBtn = $(this);
	let msgId = $deleteBtn.data('notification-id');
	// console.log(msgId);
	let confirmDelete = confirm('Confirm Delete ?');
	if (confirmDelete) {
		$deleteBtn.find('i').html('autorenew');
		$.ajax({
			url: '/server/message.php',
			data: {
				acc_type: 'org',
				table_name: 'sender',
				message_id: msgId
			},
			type: 'POST'
		}).done(function (data) {
			// console.log(data);
			$deleteBtn.find('i').html('delete');
			try {
				data = JSON.parse(data);
				let $msgSelector = $(
					".sent-container .message-list li[data-notification-id='" +
					msgId +
					"']"
				);
				$msgSelector.remove();
				$('.message-overlay-container').hide();
				$('.sent-container').show();
			} catch (e) {
				console.log('Parse error');
			}
		});
	}
});;
