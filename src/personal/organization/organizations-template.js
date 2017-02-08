import {
	getOrgTmplStr
} from './org-template';

function getOrgsTmplStr(organizations) {
	let orgsTmplStr = '';
	let adminOrgs = organizations.admin;
	let authOrgs = organizations.auth;
	if (adminOrgs.length > 0 || authOrgs.length > 0) {
		let adminTmplStr = '';
		adminOrgs.forEach(function (org) {
			adminTmplStr = adminTmplStr + getOrgTmplStr(org, 'Admin');
		});

		let authTmplStr = '';
		authOrgs.forEach(function (org) {
			authTmplStr = authTmplStr + getOrgTmplStr(org, 'Auth-access');
		})
		return orgsTmplStr = adminTmplStr + authTmplStr;
	}
	return '<center>You Do not have any Organization Account<center>';
}

export {
	getOrgsTmplStr
};;
