// import $ from 'jQuery';

import {
	api
} from '../api/api';

import {
	getGroupTmplStr
} from '../groups/group-template';
import {
	getGroupMemberTmplStr
} from '../groups/group-member-template';

// dom caching
let $pageContent = $(".page-content");
let $groupsContainer = $pageContent.find(".groups-container");
let $groupOverlayContainer = $pageContent.find('.group-overlay-container');
let $groupsList = $groupsContainer.find(".groups-list");
// console.log($pageContent, $groupsContainer, $groupOverlayContainer, $groupsList);


// delete group from groups-container
$groupsList.on('click', '.group .delete', handleDeleteGroup);

// delete group member from groups-overlay-container
$groupOverlayContainer.on('click', '.members .delete', handleDeleteGroupMember);

// back button
$groupOverlayContainer.find('.back-btn')
	.click(handleBackBtn);

let $createGroupDialog = $groupsContainer.find("#create-group-dialog");
$createGroupDialog.find(".create-group-btn")
	.click(function (e) {
		e.preventDefault();
		$createGroupDialog.find('.error')
			.hide()
			.html("")
			.fadeIn();
		var groupName = $createGroupDialog.find("#create-group-input")
			.val();
		if (groupName === '') {
			$createGroupDialog.find('.error')
				.html("Group Name Cannot be empty");
		} else {
			// create new group
			let $spinnerWrapper = $createGroupDialog.find(".spinner-wrapper");
			let $spinner = $spinnerWrapper.find(".mdl-spinner");
			$spinnerWrapper.show();
			$spinner.addClass('is-active');

			let $clickedButton = this;
			$clickedButton.disabled = true;
			$.ajax({
					type: 'POST',
					url: '/server/org_group.php',
					data: {
						create_group: groupName
					}
				})
				.done(function (link) {
					if ($.trim(link) === '0') {
						$spinner.hide();
						$createGroupDialog.find(".error")
							.html("Group Already Exists");
						$createGroupDialog.find(".spinner-wrapper .mdl-spinner")
							.removeClass('is-active');
						$spinnerWrapper.hide();
						$clickedButton.disabled = false;
					} else {
						console.log(link);
						$spinner.hide();
						$createGroupDialog.find(".spinner-wrapper .mdl-spinner")
							.removeClass('is-active');
						$createGroupDialog.find(".error")
							.html("Group Created");
						$spinnerWrapper.hide();
						$clickedButton.disabled = false;
						$("ul.groups-list")
							.append(getGroupTmplStr(groupName, link));
					}
				})
				.fail(function (a, b, c) {
					console.log(a, b, c);
				});
		}
	});

// EVENT HANDLERS

/**
 * Get groupName and notifierId and remove parent .member element
 * after successfull delete request
 */
function handleDeleteGroupMember(e) {
	e.preventDefault();
	let $clickedButton = $(this);
	let grpName = $clickedButton.attr('data-group-name');
	let memberNotifierId = $clickedButton.attr('data-member-notifierid');
	let confirmDelete = confirm('Confirm Deletion of member ' + memberNotifierId);
	// console.log(grpName, memberNotifierId);

	if (confirmDelete) {
		$.ajax({
			url: '/server/org_group.php',
			data: {
				group_member: memberNotifierId,
				group_name: grpName
			},
			type: 'POST'
		}).done(function (data) {
			console.log(data);
			$clickedButton.parents('.member')
				.slideUp()
				.remove();
		});
	}
}

/**
 * Get attr name and remove parent .group
 * element after successfull delete request
 */
function handleDeleteGroup(e) {
	e.preventDefault();
	e.stopPropagation();

	let $clickedButton = $(this);
	let grpName = $clickedButton.attr('data-group-name');

	let confirmDelete = confirm('Confirm Deletion of Group ' + grpName);
	if (confirmDelete && grpName) {
		$.ajax({
			url: '/server/org_group.php',
			data: {
				delete_group: grpName
			},
			type: 'POST'
		}).done(function (data) {
			data = $.trim(data);
			if (data === '1') {
				$clickedButton.parents('.group')
					.remove();
			} else if (data === '0') {
				console.log('db error');
			} else {
				console.log('server error');
			}
		});
	}
}

function handleBackBtn() {
	$groupOverlayContainer.hide();
	$groupsContainer.fadeIn();
}
