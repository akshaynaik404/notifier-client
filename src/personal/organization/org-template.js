export function getOrgTmplStr(org, type) {
	let orgStr =
		`
  <li class="mdl-list__item mdl-list__item--two-line org">
  <span class="mdl-list__item-primary-content">
  <i class="material-icons mdl-list__item-avatar">security</i>
  <span class="org-notifier-id">${org}</span>
  <span class="mdl-list__item-sub-title">${type}</span>
  </span>
  </li>`;
	return orgStr;
}
