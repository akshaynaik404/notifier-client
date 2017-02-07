export function getAuthUsersTmplStr(authUsers) {
	let authUsersStr = '';
	if (authUsers && authUsers.length > 0) {
		authUsers.forEach(function (user) {
			let userStr =
				`<div class="mdl-list__item">
			<span class="mdl-list__item-primary-content">
			<i class="material-icons mdl-list__item-avatar">person</i>
			<span>${user}</span>
			</span>
			<a class="mdl-list__item-secondary-action auth-delete-btn" href="#" data-notifier-id=${user}>
			<i class="material-icons">delete</i>
			</a>
			</div>`;
			authUsersStr = authUsersStr + userStr;
		});
		return authUsersStr;
	}
	return '<center>No Authorized Users</center>' +
		'<center>To add share Authorize Access Link</center>';
}
