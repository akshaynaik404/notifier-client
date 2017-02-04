export function getSentMsgTmplStr( message ) {
	let messageTmplStr =
		`<li class="mdl-list__item message" data-notification-id='${message.id}'>
      <div class="mdl-list__item subject-wrapper">
        <span class="mdl-list__item-primary-content">
          <span>${message.subject}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
          <a class="mdl-list__item-secondary-action delete" href="#" data-notification-id='${message.id}'>
            <i class="material-icons">delete</i>
          </a>
        </span>
      </div>
      <div class="mdl-list__item message-text">${message.body}</div>
    </li>`;
	return messageTmplStr;
}
