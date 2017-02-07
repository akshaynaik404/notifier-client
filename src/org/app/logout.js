import $ from 'jQuery';

$('a.logout-btn').click(function (e) {
	e.preventDefault();
	$.ajax({
		url: '/server/org_home.php',
		data: {
			logout: ''
		},
		type: 'POST'
	}).done(function (res) {
		if ($.trim(res) === '1') {
			location.href = './personal.html';
		} else {
			alert('Error');
		}
	});
});
