export function getMsgOverlayTmplStr( clickedMessage ) {
	let msgOverlayStr =
		`<li class="mdl-card mdl-shadow--2dp message">
    <div class="mdl-card__title">
      <div class="mdl-card__title-text from">
        <span class="org">Sent To</span>
        <span>:</span>
        <span class="personal">${clickedMessage.to}</span>
        <span class="people">&nbsp;people</span>
      </div>
      <div class="mdl-card__title-text from">
        <span class="org">Date</span>
        <span>:</span>
        <span class="personal">${clickedMessage.date}</span>
      </div>
      <div class="mdl-card__title-text from">
        <span class="org">Time</span>
        <span>:</span>
        <span class="personal">${clickedMessage.time}</span>
      </div>
      <div class="mdl-card__title-text subject">${clickedMessage.subject}</div>
    </div>
    <div class="mdl-card__supporting-text">${clickedMessage.body}</div>
    <div class="mdl-card__actions">
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect back-to-sent">
        <i class="material-icons">arrow_back</i>
      </button>
      <button
        class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect delete"
        data-notification-id='${clickedMessage.id}'
      >
        <i class="material-icons">delete</i>
      </button>
    </div>
  </li>`;
	return msgOverlayStr;
}
