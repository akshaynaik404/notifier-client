import $ from 'jQuery';
// console.log('auth orgs loaded');
$(function() {
    var orgs = [];
    $.ajax({
        type: "POST",
        url: "php_scripts/personal_load_auth_orgs.php"
    }).done(function(data) {
        var $app = $(".personal-app-container");
        var $orgs = $(data).find("AuthOrg");
        // console.log($orgs.length);
        if($orgs.length > 0) {
          renderWrappers();
          $orgs.each(function() {
              var orgNotifierId = $(this).text();
              $app.find(".auth-orgs-list").append("<li class='mdl-list__item'>" + orgNotifierId + "</li>");
          });
          $("body").on("click", ".auth-orgs-list li", function (e) {
            var orgNotifierId = e.target.innerHTML;
            $.ajax({
                type: "GET",
                data: {
                  org_notifier_id: orgNotifierId
                },
                url: "php_scripts/org_is_auth_access.php"
            }).done(function(data) {
              var response = $.trim(data);
              if(response === "1") {
                console.log('Autrhorize Access');
                location.href = "/org-app.html";
              } else if (response === "0"){
                console.log('No Access');
              } else {
                console.log('server error');
              }
            }).fail(function(event, jqxhr, settings, thrownError) {
                console.log(event + jqxhr.status + settings + thrownError);
            });
          });
        }
    }).fail(function(event, jqxhr, settings, thrownError) {
        console.log(event + jqxhr.status + settings + thrownError);
    });
});

function renderWrappers() {
    var $app = $(".personal-app-container");
    var linkStr = "<a class='link-auth mdl-navigation__link'>Authorized Access</a>";
    var authContainerStr = "<div class='auth-container' style='display: none'><ul class='mdl-list auth-orgs-list'></ul></div>";
    $app.find(".link-connections").after(linkStr);
    $app.find(".change-container").after(authContainerStr);
}
