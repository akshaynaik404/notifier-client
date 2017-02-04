import $ from 'jQuery';

$('body')
	.on('click', '.auth-list a.auth-delete-btn', function (e) {
		e.preventDefault();
		let $deleteBtn = $(this);
		let notifierId = $deleteBtn.attr('data-notifier-id');
		let confirmDelete = confirm(`Confirm Delete User ${notifierId}`);
		if (confirmDelete) {
			$.ajax({
				url: '/server/org_auth_access.php',
				data: {
					remove_auth_access: notifierId,
				},
				type: 'POST'
			}).done(function (data) {
				data = $.trim(data);
				if (data === '1') {
					// delete group call
					$deleteBtn.parent().remove();
				} else if (data === '0') {
					console.log('db error');
				} else {
					console.log('server error');
				}
			});
		}
	});
