import $ from 'jQuery';

import './organizations.scss';

// import {
// 	api
// } from '../api/api';
import {
	getOrgsTmplStr
} from './organizations-template';
// let organizations = api.getOrganizations();
// console.log('load-orgs.js loaded');
// load organizations

let orgs = [];
let $orgList = $('.organizations-container .org-list');
_render();

// function _removeOrg(org) {
// 	let orgIndex = orgs.indexOf(org);
// 	if (orgIndex != -1) {
// 		return orgs.splice(orgIndex, 1)
// 	}
// }

export function addOrg(org) {
	orgs.push(org);
	_render();
}

function _render() {
	$orgList.html(getOrgsTmplStr(orgs, 'Admin'));
}
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
		orgs.forEach(function (org) {
			addOrg(org);
		})
	} catch (e) {
		console.log('Parse error');
	}
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
