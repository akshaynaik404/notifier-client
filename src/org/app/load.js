import $ from 'jQuery';

import {
	groups
} from '../groups';
import {
	sent
} from '../sent';
import {
	compose
} from '../compose';
import {
	authUsers
} from '../auth-users';

import {
	getGroupMemberTmplStr
} from '../groups/group-member-template';

import {
	getMsgOverlayTmplStr
} from '../sent/msgOverlay';

// load groups and compose recipients
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_groups: ''
	},
	type: 'POST'
}).done(function (data) {
	// console.log(data);
	try {
		data = JSON.parse(data);
	} catch (e) {
		console.log('Parse error');
	}
	groups.load(data);
	compose.loadRecipients(data);

	let $pageContent = $(".page-content");
	let $groupsContainer = $pageContent.find(".groups-container");
	let $groupOverlayContainer = $pageContent.find('.group-overlay-container');
	let $groupsList = $groupsContainer.find(".groups-list");

	// load group members list inside .group-overlay-container
	$groupsList.on('click', '.group', loadGroupOverlayContainer);
	/**
	 * Show group members of the selected group inside .group-overlay-container
	 */
	function loadGroupOverlayContainer() {
		let $grpMembers = $groupOverlayContainer.find('.members');
		// Remove previously loaded members
		$grpMembers.html("");

		let groupName = $(this)
			.attr('data-group-name');
		console.log(groupName);

		if (data && Object.keys(data)
			.length > 0) {
			let groupMembers = data[groupName];
			if (groupMembers && groupMembers.length > 0) {
				groupMembers.forEach(function (member) {
					// create markup from template and append to .members
					let grpMemberTmplStr = getGroupMemberTmplStr(groupName, member);
					$grpMembers.append(grpMemberTmplStr);
				});
			}
		}
		$groupsContainer.hide();
		$groupOverlayContainer.fadeIn();
	}
});

// load auth access
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_auth_access: ''
	},
	type: 'POST'
}).done(function (data) {
	// console.log(data);
	try {
		data = JSON.parse(data);
	} catch (e) {
		console.log('Parse error');
	}
	authUsers.load(data);
});

// load sent msgs
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_sentbox: ''
	},
	type: 'POST'
}).done(function (data) {
	try {
		data = JSON.parse(data);
	} catch (e) {
		console.log('Parse error');
	}
	sent.load(data);

	$('body').on('click', '.sent-container .message', function () {
		let dataNotificationId = $(this).attr('data-notification-id');
		let clickedMessage;
		data.forEach(function (message) {
			if (message.id === dataNotificationId) {
				// show message
				clickedMessage = message;
			}
		});
		$('.sent-container').hide();
		$('.message-overlay-container').html(getMsgOverlayTmplStr(clickedMessage));
		$('.message-overlay-container').fadeIn();
	});
});
