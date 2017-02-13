// import $ from 'jQuery';
// console.log('router.js loaded');
$(function () {
	var $personalApp = $('.personal-app-container');
	hideAllExcept("inbox-container");
	// setActive($personalApp.find('.link-inbox'));
	function hideAllExcept(activeElementName) {
		$personalApp.find("[class$='-container']").not('.' + activeElementName).hide();
		var activeElementObj = $personalApp.find("." + activeElementName);
		activeElementObj.show();
	}

	$(document).on('click', "[class^='link-']", function (e) {
		e.preventDefault();
		$personalApp.find("[class^='link-']").removeClass('active');
		$personalApp.find('.mdl-layout__drawer').removeClass('is-visible');
		$personalApp.find('.mdl-layout__obfuscator').removeClass('is-visible');
		// setActive($(this));
		$(this).addClass('active');
		var linkName = $(this)[0].classList[0].split(" ")[0].split("-")[1];
		var containerName = linkName + "-container";
		hideAllExcept(containerName);
	});
});
