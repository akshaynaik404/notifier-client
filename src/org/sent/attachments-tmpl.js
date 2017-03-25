export function getAttachmentsTmplStr(attachments) {
	let attachmentsTmplStr = '';
	if (attachments && Object.keys(attachments).length > 0) {
		Object.keys(attachments).forEach(function (name) {
			attachmentsTmplStr +=
				`<div><a href="${attachments[name]}" download>${name}</a></div>`;
		});
	}
	return attachmentsTmplStr;
}
