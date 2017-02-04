import $ from 'jQuery';
import {
	getSentMessagesTmplStr
} from './sentMessages';

export function loadSentMsgs( messages ) {
	$( '.sent-container .message-list' )
		.append( getSentMessagesTmplStr( messages ) );
};
