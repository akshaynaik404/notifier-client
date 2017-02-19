// import $ from 'jQuery';

import {
	api
} from '../api/api';
import {
	getSentMsgTmplStr
} from '../compose/sentMsg';

// addMsg function form sent component
import {
	addMsg
} from '../sent/';

$(".select-recipient")
	.click(function (e) {
		e.preventDefault();
		$("ul.recipients-list")
			.slideToggle();
	});

$('body')
	.on('click', '.group-name .mdl-list__item-primary-content', function () {
		let grpName = $(this)
			.parent()
			.attr('data-group-name');
		$('.group-members-' + grpName)
			.slideToggle();
	});

$("body")
	.on("change", "input[id^='group-checkbox-']", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var groupName = $(this)
			.parents('.group-name')
			.attr("data-group-name");
		// console.log(this.checked);
		if (this.checked) {
			// console.log('Check all recipients');
			let memberCheckboxesObj = $("input.group-" + groupName + "-member");
			memberCheckboxesObj.each(function (index, checkbox) {
				checkbox.checked = true;
				// console.log(checkbox, checkbox.checked);
			});
		} else {
			// console.log('UNCheck all recipients');
			let memberCheckboxesObj = $("input.group-" + groupName + "-member");
			// console.log(memberCheckboxesObj);
			memberCheckboxesObj.each(function (index, checkbox) {
				checkbox.checked = false;
				// console.log(checkbox, checkbox.checked);
			});
		}
	});
let $composeBox = $("#compose-box-dialog");
$composeBox.find(".btn-send")
	.click(function () {
		let $clickedBtn = this;
		var recipientsList = "";
		var $recipients = $composeBox
			.find("input[type=checkbox]:checked")
			.not("[id^='group-']");
		if ($recipients.length > 0) {
			// $composeBox.find('.compose-error').hide();
			var subject = $composeBox.find("textarea#subject").val();
			var message = $composeBox.find("textarea#message").val();
			// show loading gif
			// $('.spinner').show();
			// disable button
			$clickedBtn.disabled = true;
			$recipients.each(function (index, recipient) {
				recipientsList = recipientsList +
					$(recipient)
					.attr("data-notifier-id") +
					",";
			});
			recipientsList = recipientsList.slice(0, -1);
			let $progressBar = $composeBox.find('.mdl-progress');
			$progressBar.show();
			// send message
			$.ajax({
				url: '/server/message.php',
				data: {
					recipients: recipientsList,
					subject: subject,
					message: message
				},
				type: 'POST'
			}).done(function (data) {
				$progressBar.hide();
				let msgObj;
				try {
					msgObj = JSON.parse(data);
					msgObj['to'] = $recipients.length;
					$clickedBtn.disabled = false;
					addMsg(msgObj);
				} catch (e) {
					console.log('Parse Error');
				}
			});

		} else {
			$composeBox.find('.compose-error')
				.show();
		}

	});

$composeBox.find(".close")
	.click(function (e) {
		let $groupCheckbox = $("input[type='checkbox']");
		$groupCheckbox.each(function () {
			this.checked = false;
		});
		$groupCheckbox.parents("label")
			.removeClass("is-checked");
		$composeBox.find("textarea")
			.each(function () {
				$(this)
					.val("");
				$(this)
					.parent()
					.removeClass("is-dirty");
			});
		$composeBox.find(".recipients-list")
			.slideUp();
		$composeBox.find(".group-members")
			.slideUp();
	});
