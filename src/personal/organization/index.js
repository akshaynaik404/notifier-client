import $ from 'jQuery';

import './organizations.scss';

// import {
// 	api
// } from '../api/api';
import {
	getOrgsTmplStr
} from '../templates/orgs';
// let organizations = api.getOrganizations();
// console.log('load-orgs.js loaded');

// load organizations
$.ajax({
	url: '/server/personal_home.php',
	data: {
		admin_access: ''
	},
	type: 'POST'
}).done(function (orgs) {
	// console.log(orgs);
	try {
		orgs = JSON.parse(orgs);
	} catch (e) {
		console.log('Parse error');
	}
	$('.organizations-container .org-list').append(getOrgsTmplStr(orgs, 'Admin'));
});
$.ajax({
	url: '/server/personal_home.php',
	data: {
		auth_access: ''
	},
	type: 'POST'
}).done(function (orgs) {
	// console.log(orgs);
	try {
		orgs = JSON.parse(orgs);
	} catch (e) {
		console.log('Parse error');
	}
	$('.organizations-container .org-list').append(getOrgsTmplStr(orgs,
		'Auth-access'));
});
