import $ from 'jQuery';
import {
	getAuthUsersTmplStr
} from './auth-users-template';

export function loadAuthUsers(users) {
	$('.authorized-container .auth-list')
		.append(getAuthUsersTmplStr(users));
};
