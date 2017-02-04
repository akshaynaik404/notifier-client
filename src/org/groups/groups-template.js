import {
	getGroupTmplStr
} from './group-template';

function getGroupsTmplStr( groups ) {
	let groupsStr = '';
	for ( let group in groups ) {
		groupsStr = groupsStr + getGroupTmplStr( group );
	}
	return groupsStr;
}

export {
	getGroupsTmplStr
}
