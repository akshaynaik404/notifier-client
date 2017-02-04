import $ from 'jQuery';

import './connections.scss';

// import {
// 	api
// } from '../api/api';
import {
	getGroupTmplStr
} from '../templates/groups';

// let groups = api.getGroups();
// console.log(groups);
// console.log('connections.js loaded');
// renderGroups

// load connections
$.ajax({
	url: '/server/personal_home.php',
	data: {
		connections: ''
	},
	type: 'POST'
}).done(function (connections) {
	// console.log(connections);
	try {
		connections = JSON.parse(connections);
	} catch (e) {
		console.log('Parse error');
	}
	// console.log(connections);
	$('.connections-container .connection-list').append(getGroupTmplStr(
		connections));
});


$('body').on('click', '.connections-container .connection-list .delete',
	function (e) {
		e.preventDefault();
		let $clickedBtn = $(this);
		let grpName = $(this).attr('data-group-name');
		let orgNotifierId = $(this).attr('data-org-notifier-id');
		let confirmDelete = confirm('Confirm Deletion of ' + grpName);
		// console.log(grpName, orgNotifierId, confirmDelete);

		// 		// start spinner
		// 		$('.connection-list .mdl-spinner').toggleClass('is-active');
		if (confirmDelete) {
			$.ajax({
				url: '/server/personal_connection.php',
				data: {
					remove_org_connection: orgNotifierId,
					group_name: grpName
				},
				type: 'POST'
			}).done(function (data) {
				data = $.trim(data);
				if (data === '1') {
					$clickedBtn.parents('li').remove();
				} else if (data === '0') {
					console.log('db error');
				} else {
					console.log('server error');
				}
			});
		}
	});
