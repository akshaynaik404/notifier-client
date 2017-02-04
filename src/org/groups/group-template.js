function getGroupTmplStr( group ) {
	let tmplStr =
		`<div class="mdl-list__item mdl-list__item--two-line group" data-group-name="${group}">
      <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-avatar">person</i>
        <span>${group}</span>
        <span class="mdl-list__item-sub-title">Group Link: http:\/\/akshaynaik.me</span>
      </span>
      <span class="mdl-list__item-secondary-content">
        <a
          class="mdl-list__item-secondary-action delete"
          href="#"
          data-group-name='${group}'
        >
        <i class="material-icons">delete</i></a>
        </div>
      </span>`;
	return tmplStr;
}

export {
	getGroupTmplStr
}
