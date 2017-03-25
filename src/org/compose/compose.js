// import $ from 'jQuery';

import {
	api
} from '../api/api';
// addMsg function form sent component
import {
	addMsg
} from '../sent/';

let attachments = {};

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
		var $recipients = $composeBox
			.find("input[type=checkbox]:checked")
			.not("[id^='group-']");
		// console.log($recipients);
		if ($recipients.length > 0) {
			$composeBox.find('.compose-error').fadeOut();
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
			$composeBox.find('.compose-error').hide();
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
					message: message,
					attachments: attachments
				},
				type: 'POST'
			}).done(function (data) {
				$progressBar.hide();
				let msgObj;
				try {
					msgObj = JSON.parse(data);
					msgObj['to'] = $recipients.length;
					msgObj['attachments'] = attachments;
					$clickedBtn.disabled = false;
					// console.log(msgObj);
					addMsg(msgObj);
					$composeBox.find(".mdl-dialog__actions 	.close").trigger('click');
					// show message sent
					$('.message-sent').fadeIn().fadeOut(4000);
				} catch (e) {
					console.log('Parse Error', e);
				}
			});

		} else {
			$composeBox.find('.compose-error')
				.show();
		}

	});

$composeBox.find(".mdl-dialog__actions .close")
	.click(function (e) {
		let $groupCheckbox = $("input[type='checkbox']");
		$('.mdl-layout__drawer').removeClass('is-visible');
		$('.mdl-layout__obfuscator').removeClass('is-visible');

		// clear checkboxes
		$groupCheckbox.each(function () {
			this.checked = false;
		});
		$groupCheckbox.parents("label")
			.removeClass("is-checked");

		// clear textarea's
		$composeBox.find("textarea")
			.each(function () {
				$(this)
					.val("");
				$(this)
					.parent()
					.removeClass("is-dirty");
			});

		// reset slider position
		$composeBox.find(".recipients-list")
			.slideUp();
		$composeBox.find(".group-members")
			.slideUp();

		// clear file selection
		$composeBox.find('.file-inputs-wrapper > .file-input-wrapper').remove();
		$composeBox.find('.file-inputs-wrapper')
			.append(
				`
				<div class="file-input-wrapper">
					<input class="file-input" type="file">
					<a href="#" class="file-link" download></a>
					<i
						class="material-icons close file-link"
						style="display: none; cursor: pointer;"
					>close</i>
					<i class="material-icons sync" style="display: none">sync</i>
				</div>
			`
			);
		attachments = {};
		// enable send button
		$composeBox.find('.btn-send')[0].disabled = false;
	});
$composeBox.on('change', '.file-input', function (e) {
	// console.log(e);
	// disable the send button
	let $activeInput = $(this);
	var file = e.target.files[0];
	if (file) {
		$composeBox.find('.btn-send')[0].disabled = true;
		// console.log(file);
		$activeInput.siblings('i.sync').show();
		$activeInput.hide();
		$activeInput.after('<span class="file-name">' + file.name + '</span>');
		let fileName = file.name.split('.')[0];
		let fileExtension = file.name.split('.')[1];
		var storageRef = firebase.storage().ref(fileName + UUID() + '.' +
			fileExtension);
		var task = storageRef.put(file);
		task.on('state_changed',
			function (snapshot) {
				var percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			function (error) {
				console.log('Error: ', error);
				alert('Error Uploading File');
				$activeInput.parent().remove();
				$composeBox.find('.btn-send')[0].disabled = false;
			},
			function () {
				storageRef.getDownloadURL().then(function (url) {
					$activeInput.siblings('i.sync').hide();
					$activeInput.css('display', 'none');
					$composeBox.find('.btn-send')[0].disabled = false;
					attachments[file.name] = url;
					$activeInput.siblings('a.file-link').attr('href', url);
					$activeInput.siblings('a.file-link').text(file.name);
					$activeInput.siblings('i.close').show();
					$activeInput.siblings('.file-name').hide();
					$activeInput.parent().after(
						`<div class="file-input-wrapper">
							<input class="file-input" type="file">
							<a href="#" class="file-link" download></a>
							<i
								class="material-icons close file-link"
								style="display: none; cursor: pointer;"
							>close</i>
							<i class="material-icons sync" style="display: none">sync</i>
						</div>`
					);
				});
			});
	} else {
		// hide file name
	}
});
// courtesy of SO I DON'T KNOW HOW THIS WORKS
function UUID() { // Public Domain/MIT
	var d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now ===
		'function') {
		d += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
		c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

$composeBox.on('click', '.file-input-wrapper i.close', function (e) {
	// console.log(e);
	// e.preventDefault();
	let $removeBtn = $(this);
	console.log($removeBtn);
	let selectedFileName = $removeBtn.siblings('a.file-link').text();
	$removeBtn.parent().remove();
	let fileNamesArr = Object.keys(attachments);
	console.log(attachments);
	if (fileNamesArr) {
		fileNamesArr.forEach(function (fileName) {
			if (fileName === selectedFileName) {
				delete attachments[fileName];
			}
		})
	}
})
