// import $ from 'jQuery';

import './connections.scss';

// import {
// 	api
// } from '../api/api';
import {
	getGroupTmplStr
} from './connections-template';

// let groups = api.getGroups();
// console.log(groups);
// console.log('connections.js loaded');
// renderGroups

let connections = {};
let $connectionsList = $('.connections-container .connection-list');
_render();

export function removeConnection(connection) {
	delete connections[connection];
	_render();
}

export function addConnection(grp, org) {
	connections[grp] = org;
	_render();
}

function _render() {
	$connectionsList.html(getGroupTmplStr(
		connections));
}

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
		for (let connection in connections) {
			addConnection(connection, connections[connection]);
		}
	} catch (e) {
		console.log('Parse error');
	}
	// console.log(connections);
	// $('.connections-container .connection-list').append(getGroupTmplStr(
	// 	connections));
});


$connectionsList.on('click', '.delete', function (e) {
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
				// $clickedBtn.parents('li').remove();
				removeConnection(grpName);
			} else if (data === '0') {
				console.log('db error');
			} else {
				console.log('server error');
			}
		});
	}
});
