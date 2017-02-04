import $ from 'jQuery';

import {
	vars
} from './vars';
import {
	functions
} from './functions';

$(function () {
	vars.$loginContainer.find(".login-submit > a").on('click', function (e) {
		// console.log('clicked login btn');
		e.preventDefault();
		var notifierId = functions.getValue("#notifier-id", ".login-container");
		var password = functions.getValue("#password", ".login-container");
		console.log(notifierId, password);
		$.ajax({
			type: 'POST',
			url: "/server/personal_home.php",
			data: {
				"notifier_id": notifierId,
				"password": password
			}
		}).done(function (data) {
			console.log(data);
			vars.$loginContainer.find(".response").html(data);
		}).fail(function (res) {
			console.log(res);
		});
	});
});
