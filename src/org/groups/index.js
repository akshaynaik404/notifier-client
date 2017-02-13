// import $ from 'jQuery';

import './groups.scss';
import './group-overlay.scss';
import {
	loadGroups
} from '../groups/loadGroups';
import {
	getGroupMemberTmplStr
} from './group-member-template.js'
export let groups = {
	load: loadGroups
}

// load groups
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
		groups.load(data);

		let $pageContent = $(".page-content");
		let $groupsContainer = $pageContent.find(".groups-container");
		let $groupOverlayContainer = $pageContent.find('.group-overlay-container');
		let $groupsList = $groupsContainer.find(".groups-list");

		// load group members list inside .group-overlay-container
		$groupsList.on('click', '.group .group-name', loadGroupOverlayContainer);
		/**
		 * Show group members of the selected group inside .group-overlay-container
		 */
		function loadGroupOverlayContainer() {
			let $grpMembers = $groupOverlayContainer.find('.members');
			// Remove previously loaded members
			$grpMembers.html("");

			let groupName = $(this)
				.parents('.group')
				.attr('data-group-name');

			if (data && Object.keys(data)
				.length > 0) {
				let groupMembers = data[groupName].members;
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
	} catch (e) {
		console.log('Parse error');
	}

});
