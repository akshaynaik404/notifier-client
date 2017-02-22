// import $ from 'jQuery';

import {
	vars
} from './vars.js';

// forgot  password submit SUCCESS handler
vars.$forgotPasswordContainer.find('.forgot-password-submit-btn').on('click',
	function () {
		var mobile_no = vars.$forgotPasswordContainer.find("#mobile_no").val();
		let $progressBar = vars.$forgotPasswordContainer.find('.mdl-progress');
		let $clickedBtn = this;
		// console.log(mobile_no);

		// show loading state
		$progressBar.show();
		$clickedBtn.disabled = true;

		$.ajax({
			type: "POST",
			url: "/server/forgot_password/forgot_password.php",
			data: {
				mobile_no: mobile_no
			}
		}).done(function (data) {
			// show request is complete
			$progressBar.hide();
			$clickedBtn.disabled = false;
			// console.log(data);
			if ($.trim(data) === "1") {
				vars.$recoverySuccess.fadeIn();
				alert('Otp sent. Check mobile phone');
				location.href = './forgot_password_otp_validation.html';
			} else if ($.trim(data) === "0") {
				vars.$forgotPasswordContainer.find('.mdl-textfield').addClass(
					'is-invalid');
			} else {
				console.log("server error: ", data);
			}
		}).fail(function (event, jqxhr, settings, thrownError) {
			console.log(event + jqxhr.status + settings + thrownError);
		});
	});
