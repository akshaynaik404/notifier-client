import {
	getGroupTmplStr
} from './group-template';

function getGroupsTmplStr(groups) {
	let groupsStr = '';
	for (let groupName in groups) {
		let groupLink = groups[groupName].link;
		groupsStr = groupsStr + getGroupTmplStr(groupName, groupLink);
	}
	return groupsStr;
}

export {
	getGroupsTmplStr
}
