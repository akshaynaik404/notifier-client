import $ from 'jQuery';

import './change.scss';

$(function () {
	var $changeContainer = $(".change-container");
	$changeContainer.find(".login-submit > a").click(function (e) {
		var oldPassword = $changeContainer.find("input#old-password").val();
		var newPassword = $changeContainer.find("input#new-password").val();
		var confirmNewPassword = $changeContainer.find(
			"input#confirm-new-password").val();
		let $success = $changeContainer.find(".feedback .success");
		let $error = $changeContainer.find(".feedback .error");
		if (newPassword && confirmNewPassword) {
			// console.log(oldPassword + " " + newPassword + " " + confirmNewPassword);
			if (newPassword === confirmNewPassword) {
				$changeContainer.find(".confirm-password-error").css("visibility",
					"hidden");
				$.ajax({
					type: "POST",
					data: {
						"old_password": oldPassword,
						"new_password": newPassword
					},
					url: "/server/personal_home.php"
				}).done(function (data) {
					data = $.trim(data);
					if (data === '1') {
						$success.show();
						$error.html('');
					} else if (data === '0') {
						$error.html('Incorrect old password')
						$success.hide();
					} else {
						$error.html(data);
						$success.hide();
					}
				});
			} else {
				$error.html('Password do not match');
				$success.hide();
			}
		} else {
			$error.html('Passwords cannot be blank');
			$success.hide();
		}
	});
});
