// import $ from 'jQuery';

import {vars} from './vars.js';

// forgot  password submit SUCCESS handler
vars.$forgotPasswordContainer.find('.forgot-password-submit-btn').on('click', function () {
  var email = vars.$forgotPasswordContainer.find("#email").val();
  // console.log(email);
  $.ajax({
    type: "POST",
    url: "/server/forgot_password/forgot_password.php",
    data: {
      email: email
    }
  }).done(function (data) {
    // console.log(data);
    if ($.trim(data) === "1") {
      vars.$recoverySuccess.fadeIn();
    } else if($.trim(data) === "0"){
      vars.$forgotPasswordContainer.find('.mdl-textfield').addClass('is-invalid');
    } else {
      console.log("server error: ", data);
    }
  }).fail(function (event, jqxhr, settings, thrownError) {
    console.log(event + jqxhr.status + settings + thrownError);
  });
});
