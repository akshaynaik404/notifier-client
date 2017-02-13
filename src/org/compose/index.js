// import $ from 'jQuery';

import './compose.scss';
import {
	loadRecipients
} from '../compose/loadRecipients';

export let compose = {
	loadRecipients: loadRecipients
}

// load groups and compose recipients
$.ajax({
	url: '/server/org_home.php',
	data: {
		load_groups: ''
	},
	type: 'POST'
}).done(function (groups) {
	try {
		groups = JSON.parse(groups);
		compose.loadRecipients(groups);
	} catch (e) {
		console.log('Parse error');
	}
});
