import {
	authUsers
} from '../seed/authUsers';
import {
	groups
} from '../seed/groups';
import {
	sentMessages
} from '../seed/sentMessages';

// import $ from 'jQuery';

let serverUrl = '/server/';


export let api = {
	getAuthUsers: function () {
		return authUsers;
	},
	getGroups: function () {
		return groups;
	},
	getSentMessages: function () {
		return sentMessages;
	}
};
