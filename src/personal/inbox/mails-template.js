import {
	getAttachmentsTmplStr
} from './attachments-tmpl';

function getRecievedMailsStr(recievedMails) {
	let recievedMailsStr = '';
	if (recievedMails && recievedMails.length > 0) {
		recievedMails.forEach(function (message) {
			let attachmentsTmplStr = getAttachmentsTmplStr(message.attachments);
			console.log(attachmentsTmplStr);
			let msgTemplate =
				`<li class="mdl-card mdl-shadow--2dp message">
      <div class="mdl-card__title">
      <div class="mdl-card__title-text from">
      <span class="org">${message.sender.parent}</span>
      <span>:</span>
      <span class="personal">${message.sender.child}</span>
      </div>
			<div class="mdl-card__title-text from">
      <span class="org">Date</span>
      <span>:</span>
      <span class="personal">${message.date}</span>
      </div>
			<div class="mdl-card__title-text from">
      <span class="org">Time</span>
      <span>:</span>
      <span class="personal">${message.time}</span>
      </div>
      <div class="mdl-card__title-text subject">${message.subject}</div>
      </div>
      <div class="mdl-card__supporting-text">${message.body}
			${attachmentsTmplStr}
			</div>
      <div class="mdl-card__actions">
      <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect delete" data-message-id='${message.id}'>
      <i class="material-icons">delete</i>
      </button>
      </div>
      </li>`;
			recievedMailsStr = recievedMailsStr + msgTemplate;
		});
		return recievedMailsStr;
	}
	return '<center>Inbox Empty</center>'
}

export {
	getRecievedMailsStr
}
