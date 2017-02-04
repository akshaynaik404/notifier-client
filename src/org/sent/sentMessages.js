import {
	getSentMsgTmplStr
} from './sentMsg';
export function getSentMessagesTmplStr( sentMessages ) {
	let sentMessagesStr = '';
	sentMessages.forEach( function ( message ) {
		sentMessagesStr = sentMessagesStr + getSentMsgTmplStr( message );
	} );
	return sentMessagesStr;
}
