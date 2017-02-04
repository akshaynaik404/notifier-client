import $ from 'jQuery';
import {
	getGroupsTmplStr
} from './groups-template';
export function loadGroups( groups ) {
	$( '.groups-container .groups-list' )
		.append( getGroupsTmplStr( groups ) );
};
