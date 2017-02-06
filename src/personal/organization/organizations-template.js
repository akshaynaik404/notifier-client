function getOrgsTmplStr(organizations, type) {
	let orgsTmplStr = '';
	if (organizations.length > 0 && organizations) {
		organizations.forEach(function (org) {
			let orgStr =
				`
			<li class="mdl-list__item mdl-list__item--two-line org">
			<span class="mdl-list__item-primary-content">
			<i class="material-icons mdl-list__item-avatar">security</i>
			<span>${org}</span>
			<span class="mdl-list__item-sub-title">${type}</span>
			</span>
			</li>`;
			orgsTmplStr = orgsTmplStr + orgStr;
		});
		return orgsTmplStr;
	}
	return '<center>You Do not have any Organization Account<center>';
}

export {
	getOrgsTmplStr
};;
