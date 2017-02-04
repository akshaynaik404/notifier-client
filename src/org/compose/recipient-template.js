export function getRecipientTmplStr(recipient, groupName) {
	let memberStr =
		`<li class="mdl-list__item group-${groupName}-member">
      <span class="mdl-list__item-primary-content">
        <i class="material-icons  mdl-list__item-avatar">person</i>
        ${recipient}
      </span>
      <span class="mdl-list__item-secondary-action">
        <label for="checkbox-${recipient}">
          <input
            type="checkbox"
            id="checkbox-${recipient}"
            class="group-${groupName}-member"
            data-notifier-id=${recipient}
            />
        </label>
      </span>
    </li>`;
	return memberStr;
}
