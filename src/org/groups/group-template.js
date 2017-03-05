function getGroupTmplStr(groupName, groupLink) {
	let tmplStr =
		`<div class="mdl-list__item mdl-list__item--two-line group" data-group-name="${groupName}">
      <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-avatar">person</i>
        <span class="group-name">${groupName}</span>
        <span class="mdl-list__item-sub-title">
					<input type="text" id="${groupName}" value="${groupLink}" class="copy-input"/>
					<button class="copy-btn mdl-button mdl-js-button" data-clipboard-target="#${groupName}">
					<i class="material-icons">content_copy</i>
					</button>
				</span>
      </span>
      <span class="mdl-list__item-secondary-content">
        <a
          class="mdl-list__item-secondary-action delete"
          href="#"
          data-group-name='${groupName}'
        >
        <i class="material-icons">delete</i></a>
        </div>
      </span>`;
	return tmplStr;
}

export {
	getGroupTmplStr
}
