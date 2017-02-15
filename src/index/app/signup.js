// import $ from 'jQuery';

import {vars} from './vars.js';
import {functions} from './functions';
$(function () {
	// let vars.$personalSignupContainer = $(".personal-signup-container");
	vars.$personalSignupContainer.find(".personal-signup-submit-btn").click(function (e) {
		e.preventDefault();
		let inputIds = ["#email", "#new-notifier-id", "#new-password", "#confirm-password"];
		signUp(inputIds, vars.$personalSignupContainer, "personal_temp_signup", this);
	});
});

function signUp(inputIds, containerSelector, dataEndpointUrl, $clickedBtn) {
  // Instead use jquery serialize
  let dataObj = (function(ids) {
    dataObj = {};
    ids.forEach(function(id) {
      dataObj[id.slice(1, id.length)] = functions.getValue(id, containerSelector);
    });
    return dataObj;
  })(inputIds);
	let $progressBar = vars.$personalSignupContainer.find('.mdl-progress');

	// indicate signup loading
	$progressBar.show();
	$clickedBtn.disabled = true;

  $.ajax({
    type: "POST",
    data: dataObj,
    url: "/server/" + dataEndpointUrl + ".php"
  }).done(function(data) {

		$progressBar.hide();
		$clickedBtn.disabled = false;

    if($.trim(data) === '1') {
      window.alert('Verification link sent, Please check your e-mail inbox/spam.');
    } else if($.trim(data) === '0') {
      window.alert('Unable to process request');
    } else {
			console.log(data);
			try {
				data = JSON.parse(data);
			} catch (e) {
				console.log(e);
			}

      for (var item in data) {
        var $errorInput = $('#' + item);
        var $errorInputContainer = $errorInput.parent();
        //visually indicate error
        $errorInputContainer.addClass('is-invalid');
        //add error msg to error span
        $errorInput.siblings('span').html(data[item]);
      }
    }
  }).fail(function(event, jqxhr, settings, thrownError) {
    console.log(event + jqxhr.status + settings + thrownError);
  });
}
