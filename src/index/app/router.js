import {
	vars
} from './vars';
// import $ from 'jQuery';

$(function () {
	vars.$personalSignupContainer.hide();
	vars.$forgotPasswordContainer.hide();
	// show signup form
	vars.$loginContainer.find('.signup').on('click', function () {
		vars.$loginContainer.hide();
		// $choiceContainer.fadeIn();
		vars.$personalSignupContainer.fadeIn();
		vars.$forgotPasswordContainer.hide();
	});
	// show login screen
	vars.$backToLogin.on('click', function () {
		vars.$forgotPasswordContainer.hide();
		vars.$loginContainer.fadeIn();
		vars.$personalSignupContainer.hide();
	});
	// show forgot password
	vars.$loginContainer.find('.forgot-password').on('click', function () {
		vars.$loginContainer.hide();
		vars.$personalSignupContainer.hide();
		vars.$forgotPasswordContainer.fadeIn();
	});
});
