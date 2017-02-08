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

let orgs = {
	admin: [],
	auth: []
};
let $orgList = $('.organizations-container .org-list');
_render();

// function _removeOrg(org) {
// 	let orgIndex = orgs.indexOf(org);
// 	if (orgIndex != -1) {
// 		return orgs.splice(orgIndex, 1)
// 	}
// }

export function addOrg(orgNotifierId, type) {
	if (type === 'Admin') {
		orgs.admin.push(orgNotifierId);
	} else if (type === 'Auth-access') {
		orgs.auth.push(orgNotifierId);
	}
	_render();
}

function _render() {
	$orgList.html(getOrgsTmplStr(orgs));
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
			addOrg(org, 'Admin');
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
		orgs.forEach(function (org) {
			addOrg(org, 'Auth-access');
		});
	} catch (e) {
		console.log('Parse error');
	}
});

$('.organizations-container .org-list').on('click', '.org-notifier-id',
	function (e) {
		let orgNotifierId = this.innerHTML;
		let accessType = $(this).siblings('span')[0].innerHTML;
		if (accessType === 'Admin') {
			console.log('Admin org');
			$.ajax({
				url: '/server/org_auth_access.php',
				data: {
					is_admin_access: orgNotifierId
				},
				type: 'POST'
			}).done(function (res) {
				if ($.trim(res) === '1') {
					location.href = './org.php';
				}
			});
		} else if (accessType === 'Auth-access') {
			console.log('auth org');
			$.ajax({
				url: '/server/org_auth_access.php',
				data: {
					is_auth_access: orgNotifierId
				},
				type: 'POST'
			}).done(function (res) {
				console.log(res);
				if ($.trim(res) === '1') {
					location.href = './org.php';
				}
			});
		} else {
			console.log('error');
		}
	});
