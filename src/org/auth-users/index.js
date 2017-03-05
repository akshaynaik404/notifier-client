// import $ from 'jQuery';

import './auth.scss';

import {
	getAuthUsersTmplStr
} from './auth-users-template';

let authUsers = [];

render();

function render() {
	$('.authorized-container .auth-list')
		.html(getAuthUsersTmplStr(authUsers));
}

function addAuthUsers(user) {
	authUsers.unshift(user);
	render();
}

// load auth access
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_auth_access: ''
	},
	type: 'POST'
}).done(function (users) {
	// console.log(users);
	try {
		users = JSON.parse(users);
		users.forEach(function (user) {
			addAuthUsers(user);
		});
	} catch (e) {
		console.log('Parse error');
	}
});

$.ajax({
	url: '/server/org_home.php',
	data: {
		get_auth_link: ''
	},
	type: 'POST'
}).done(function (link) {
	link = $.trim(link);
	$('.auth-link').val(`https://www.notifier.website/auth.php?org=${link}`);
});
