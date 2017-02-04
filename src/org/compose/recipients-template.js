import {
	getRecipientTmplStr
} from './recipient-template';

function getRecipientsTmplStr(groups) {
	let recipientsStr = '';
	for (let groupName in groups) {
		let recipients = groups[groupName];
		let membersStr = '';
		recipients.forEach(function (recipient) {
			membersStr = membersStr + getRecipientTmplStr(recipient, groupName);
		});
		let tmplStr =
			`<div class="mdl-list__item group-containe">
        <div class="mdl-list__item group-name" data-group-name=${groupName}>
          <span class="mdl-list__item-primary-content">
            <i class="material-icons  mdl-list__item-avatar">person</i>
            ${groupName}
          </span>
          <span class="mdl-list__item-secondary-action">
            <label for="group-checkbox-${groupName}">
              <input
                type="checkbox" id="group-checkbox-${groupName}"
                class="group-checkbox" />
            </label>
          </span>
        </div>
        <ul class="mdl-list group-members-${groupName} group-members">
          ${membersStr}
        </ul>
      </div>`;
		recipientsStr = recipientsStr + tmplStr;
	}
	return recipientsStr;
}

export {
	getRecipientsTmplStr
}
