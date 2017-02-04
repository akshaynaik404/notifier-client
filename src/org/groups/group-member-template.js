export function getGroupMemberTmplStr( groupName, member ) {
	let grpMemberTmplStr =
		`<div class="mdl-list__item member">
      <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-avatar">person</i>
        <span>${member}</span>
      </span>
      <a class="mdl-list__item-secondary-action delete" href="#" data-group-name=${groupName} data-member-notifierid=${member}>
        <i class="material-icons">delete</i>
      </a>
    </div>`;
	return grpMemberTmplStr;
}
