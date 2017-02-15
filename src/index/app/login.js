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
			vars.$loginContainer.find(".response").hide().fadeIn().html(data);

			// indicate successfull response
			$progressBar.hide();
			$clickedBtn.disabled = false;
		}).fail(function (res) {
			console.log(res);
		});
	});
});
