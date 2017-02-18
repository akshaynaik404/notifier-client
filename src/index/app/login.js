// import $ from 'jQuery';

import {
	vars
} from './vars';
import {
	functions
} from './functions';

$(function () {
	vars.$loginContainer.find(".login-submit > a").on('click', function (e) {
		let $clickedBtn = this;
		let $progressBar = vars.$loginContainer.find(".mdl-progress");
		// indicate progress
		$progressBar.show();
		$clickedBtn.disabled = true;

		e.preventDefault();
		var notifierId = functions.getValue("#notifier-id", ".login-container");
		var password = functions.getValue("#password", ".login-container");
		$.ajax({
			type: 'POST',
			url: "/server/personal_home.php",
			data: {
				"notifier_id": notifierId,
				"password": password
			}
		}).done(function (data) {
			data = $.trim(data);
			switch (data) {
			case '0':
				vars.$loginContainer
					.find(".response")
					.hide()
					.fadeIn()
					.html('Wrong username or password');
				break;
			case 'connection':
				location.href = './connection.php';
				break;
			case 'auth':
				location.href = './auth.php';
				break;
			case 'personal':
				location.href = './personal.php';
				break;
			case 'org-signup':
				location.href = './org-signup.php';
				break;
			default:
				alert('Server Error');
			}

			// indicate successfull response
			$progressBar.hide();
			$clickedBtn.disabled = false;
		}).fail(function (res) {
			console.log(res);
		});
	});
});
