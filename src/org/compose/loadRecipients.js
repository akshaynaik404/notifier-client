import $ from 'jQuery';
import {
	getRecipientsTmplStr
} from './recipients-template';

export function loadRecipients(recipients) {
	$('#compose-box-dialog .recipients-list')
		.append(getRecipientsTmplStr(recipients));
};
