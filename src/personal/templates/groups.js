function getGroupTmplStr(groups) {
	let tmplStr = '';
	for (let org in groups) {
		let grpItemTmpl =
			`
      <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">group work</i>
          <span>${org}</span>
          <span class="mdl-list__item-sub-title">${groups[org]}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
          <a class="mdl-list__item-secondary-action delete" href="#" data-org-notifier-id=${groups[org]} data-group-name=${org}>
            <i class="material-icons">delete</i>
          </a>
        </span>
      </li>`;
		tmplStr = tmplStr + grpItemTmpl;
	}
	return tmplStr;
};

export {
	getGroupTmplStr
};
