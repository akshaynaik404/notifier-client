<!DOCTYPE html>
<html lang="en">
  <?php
    if (!isset($_COOKIE['org_notifier_id'])) {
        echo "<script>alert('Please login first');";
        echo "location.href = './personal.php';</script>";
    } else {
        session_start();
    }
  ?>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <title>Notifier</title>
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="192x192" href="logo.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Material Design Lite">
    <link rel="apple-touch-icon-precomposed" href="logo.png">

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="notifierlogo.png">
    <meta name="msapplication-TileColor" content="#3372DF">

  </head>

  <body>
    <div class="loader-container">
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
    <style>
    .loader-container{margin:0;height:100vh;width:100vw;display:flex;justify-content:center;align-items:center}.loader-container .spinner{-webkit-animation:rotator 1.4s linear infinite;animation:rotator 1.4s linear infinite}@-webkit-keyframes "rotator"{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}}@keyframes "rotator"{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}100%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}}.loader-container .path{stroke-dasharray:187;stroke-dashoffset:0;-webkit-transform-origin:center;transform-origin:center;-webkit-animation:dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;animation:dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite}@-webkit-keyframes "colors"{0%{stroke:#3f51b5;}100%{stroke:#4285F4;}}@keyframes "colors"{0%{stroke:#3f51b5;}100%{stroke:#4285F4;}}@-webkit-keyframes "dash"{0%{stroke-dashoffset:187;}50%{stroke-dashoffset:46.75;-webkit-transform:rotate(135deg);transform:rotate(135deg);}100%{stroke-dashoffset:187;-webkit-transform:rotate(450deg);transform:rotate(450deg);}}@keyframes "dash"{0%{stroke-dashoffset:187;}50%{stroke-dashoffset:46.75;-webkit-transform:rotate(135deg);transform:rotate(135deg);}100%{stroke-dashoffset:187;-webkit-transform:rotate(450deg);transform:rotate(450deg);}}
    </style>
    <script type="text/javascript">
      let bodySelector = document.getElementsByTagName('body')[0];
      let loaderSelector = document.querySelector('.loader-container');
      window.onload = function() {
        let orgAppContainer = document.querySelector('.org-app-container');
        orgAppContainer.style.display = 'block';
        loaderSelector.style.display = 'none';
      }
    </script>
    <div class="org-app-container" style="display: none">
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
            mdl-layout--fixed-header">
        <header class="mdl-layout__header">
        </header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Notifier</span>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link compose-btn">Compose</a>
            <a class="link-sent mdl-navigation__link ">Sent</a>
            <a class="link-groups mdl-navigation__link ">Groups</a>
            <!-- <a class="link-authorized mdl-navigation__link ">Authorized Users</a> -->
             <?php
             $root_dir = $_SERVER['DOCUMENT_ROOT'];
             $org_notifier_id = $_COOKIE['org_notifier_id'];
             $notifier_id = $_SESSION['notifier_id'];
             include $root_dir.'/server/database_functions/org_profile.php';
             if (is_admin_access($org_notifier_id, $notifier_id)) {
                 echo '  <a class="link-authorized mdl-navigation__link ">Authorized Users</a>';
             }
            ?>
            <a class="logout-btn mdl-navigation__link">Logout</a>
          </nav>
        </div>
        <main class="mdl-layout__content">
          <div class="page-content">
            <div class="compose-container-dialog">
              <dialog id="compose-box-dialog" class="mdl-dialog compose-box">

                <h1 class="mdl-dialog__title compose-box-title">Compose</h1>
                <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                <div class="compose-error">Please add Recipients</div>
                <div class="mdl-dialog__content" id="dialog-content">
                  <!-- Floating Multiline Textfield -->
                  <div class="mdl-list">
                    <span class="mdl-list__item select-recipients" id="select-recipients">
                      <a class="mdl-button mdl-js-button mdl-button--primary select-recipient">
                        Select Recipients
                      </a>
                    </span>
                    <ul class="mdl-list recipients-list" id="accordion-recipient-list">
                    </ul>


                  </div>

                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label subject">
                    <textarea class="mdl-textfield__input" type="text" rows="2" id="subject"></textarea>
                    <label class="mdl-textfield__label" for="subject">Subject</label>
                  </div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label message">
                    <textarea class="mdl-textfield__input" type="text" rows="6" id="message"></textarea>
                    <label class="mdl-textfield__label" for="message">Message</label>
                  </div>

                  <span class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close" id="close">Close</button>
                    <!-- Accent-colored raised button with ripple -->
                    <button class="btn-send mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                      Send
                    </button>
                  </span>
                </div>
                <div class="spinner">
                  <!-- <img src="assets/spinner.gif" alt="Loading..." height="50" width="50"> -->
                </div>
              </dialog>

            </div>
            <div class="message-overlay-container">
            </div>
            <div class="group-overlay-container">
              <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary back-btn">
                <i class="material-icons">arrow_back</i>
              </button>
              <div class="mdl-list members">

              </div>
            </div>
            <div class="sent-container">
              <ul class="mdl-list message-list"></ul>
            </div>
            <div class="groups-container">
              <button class="mdl-button mdl-button--raised mdl-js-button mdl-js-ripple-effect mdl-button--accent create-group-btn">
                Create Group
              </button>

              <!-- <ul class="groups mdl-list" id="accordion-org-groups">
                <li class="mdl-list__item">group item</li>
              </ul> -->
              <ul class="mdl-list groups-list"></ul>
              <dialog id="create-group-dialog" class="mdl-dialog create-group">

                <h1 class="mdl-dialog__title compose-box-title">Create Group</h1>
                <div class="spinner-wrapper">
                  <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
                </div>
                <div class="mdl-dialog__content" id="dialog-content">
                  <!-- Floating Multiline Textfield -->
                  <div class="error"></div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="create-group-input">
                    <label class="mdl-textfield__label" for="create-group-input">Group Name</label>
                  </div>
                  <span class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close" id="close">Close</button>
                    <!-- Accent-colored raised button with ripple -->
                    <button class="create-group-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                      Create
                    </button>
                  </span>

                </div>
              </dialog>

            </div>
            <div class="authorized-container">
              <button class="mdl-button mdl-button--raised mdl-js-button mdl-js-ripple-effect mdl-button--accent authorize-user-btn">
                Add
              </button>
              <ul class="mdl-list auth-list">
              </ul>
              <dialog id="authorize-user-dialog" class="mdl-dialog authorize-user">

                <h1 class="mdl-dialog__title compose-box-title">
                  Share this link
                </h1>
                <div class="mdl-dialog__content" id="dialog-content">
                  <!-- Floating Multiline Textfield -->
                  <div class="error"></div>
                  <input type="text" name="" value="" class="auth-link" id="auth-link"/>
                  <span class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close" id="close">Close</button>
                    <button class="mdl-button mdl-js-button copy-btn" data-clipboard-target="#auth-link">
                      <i class="material-icons">content_copy</i> Copy Link
                    </button>
                    <button class="update-link-btn mdl-button mdl-js-button">
                      Update Link
                    </button>
                  </span>

                </div>
              </dialog>
            </div>
            <script type="text/javascript">
                function dialogs(buttonElementSelector, dialogElementSelector) {
                  'use strict';
                  var dialogButton = document.querySelector(buttonElementSelector);

                  var dialog = document.querySelector(dialogElementSelector);
                  if (!dialog.showModal) {
                    dialogPolyfill.registerDialog(dialog);
                  }
                  dialogButton.addEventListener('click', function() {
                    dialog.showModal();
                  });
                  dialog.querySelector("button.close")
                    .addEventListener('click', function() {
                      dialog.close();
                    });
                };
                dialogs('.compose-btn', '#compose-box-dialog');
                dialogs('.authorize-user-btn', '#authorize-user-dialog');
                dialogs('.create-group-btn', '#create-group-dialog');
            </script>
          </div>
        </main>
      </div>
    </div>
    <link rel="shortcut icon" href="logo.png">
    <link rel="stylesheet" href="./material.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script
      src="https://code.jquery.com/jquery-3.1.1.min.js"
      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
      crossorigin="anonymous">
    </script>
    <script src="./material.min.js" charset="utf-8"></script>
    <script src="./org.js" charset="utf-8"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.6.0/clipboard.min.js"></script>
    <script type="text/javascript">
    var clipboard = new Clipboard('.copy-btn');

    clipboard.on('success', function(e) {
      // show success msg
        alert('Link Copied');
        // console.info('Action:', e.action);
        // console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
    });

    clipboard.on('error', function(e) {
        alert('Error. Please select and copy.');
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
    </script>
  </body>

</html>
