<?php
  session_start();
  function is_auth_access($notifier_id)
  {
      $root_dir = $_SERVER['DOCUMENT_ROOT'];
      include $root_dir.'/server/connect.php';
      $query = "select * from org_profile where admin = '$notifier_id'";
      $result = mysqli_query($dbc, $query);
      if ($row = mysqli_num_rows($result) > 0) {
          return true;
      } else {
          return false;
      }
  }

  function is_admin_access($notifier_id)
  {
      $root_dir = $_SERVER['DOCUMENT_ROOT'];
      include $root_dir.'/server/connect.php';
      $query = "select * from auth_access where personal_notifier_id = '$notifier_id'";
      $result = mysqli_query($dbc, $query);
      if ($row = mysqli_num_rows($result) > 0) {
          return true;
      } else {
          return false;
      }
  }
 ?>

<!DOCTYPE html>
<html lang="en">

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
      .loader-container {
        margin: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .loader-container .spinner {
        -webkit-animation: rotator 1.4s linear infinite;
        animation: rotator 1.4s linear infinite;
      }

      @-webkit-keyframes rotator {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
        }
      }

      @keyframes rotator {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
        }
      }

      .loader-container .path {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        -webkit-transform-origin: center;
        transform-origin: center;
        -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
        animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
      }

      @-webkit-keyframes colors {
        0% {
          stroke: #3f51b5;
        }
        100% {
          stroke: #4285F4;
        }
      }

      @keyframes colors {
        0% {
          stroke: #3f51b5;
        }
        100% {
          stroke: #4285F4;
        }
      }

      @-webkit-keyframes dash {
        0% {
          stroke-dashoffset: 187;
        }
        50% {
          stroke-dashoffset: 46.75;
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
        }
        100% {
          stroke-dashoffset: 187;
          -webkit-transform: rotate(450deg);
          transform: rotate(450deg);
        }
      }

      @keyframes dash {
        0% {
          stroke-dashoffset: 187;
        }
        50% {
          stroke-dashoffset: 46.75;
          -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
        }
        100% {
          stroke-dashoffset: 187;
          -webkit-transform: rotate(450deg);
          transform: rotate(450deg);
        }
      }
    </style>
    <script type="text/javascript">
      let bodySelector = document.getElementsByTagName('body')[0];
      let loaderSelector = document.querySelector('.loader-container');
      window.onload = function() {
        console.log('window has loaded')
        let personalAppContainer = document.querySelector('.personal-app-container');
        console.log(personalAppContainer);
        personalAppContainer.style.display = 'block';
        loaderSelector.style.display = 'none';
      }
    </script>
    <div class="personal-app-container" style="display: none">
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header class="mdl-layout__header"></header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Notifier</span>
          <nav class="mdl-navigation">
            <a class="link-inbox mdl-navigation__link active">Inbox</a>
            <a class="link-connections mdl-navigation__link">Connections</a>
            <a class="link-change mdl-navigation__link ">Change Password</a>
            <a class="mdl-navigation__link" href="./push.html">Notifications</a>
             <?php
               $notifier_id = $_SESSION['notifier_id'];

               if (is_auth_access($notifier_id) || is_admin_access($notifier_id)) {
                   echo '<a class="link-organizations mdl-navigation__link ">Organization</a>';
               }
             ?>
            <a class="logout-btn mdl-navigation__link">Logout</a>
          </nav>
        </div>
        <main class="mdl-layout__content">
          <div class="page-content">
            <div class="inbox-container">
              <li class="spinner-container">
                <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner"></div>
              </li>
              <ul class="mdl-list message-list">
              </ul>
            </div>
            <div class="connections-container">
              <ul class="mdl-list connection-list">
                <li class="mdl-list__item" style='text-align: center;display: none;'>
                  <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner"></div>
                </li>
              </ul>
            </div>
            <div class="organizations-container">
              <ul class="mdl-list org-list">
              </ul>
            </div>
            <div class="change-container">
              <div class="message-card-square mdl-card">
                <div class="mdl-card__title mdl-card--expand">
                  <h4 class="mdl-card__title-text">Change Password</h4>
                </div>
                <div class="mdl-card__supporting-text">
                  <div class="feedback">
                    <div class="error"></div>
                    <div class="success">Password Changed Successfully</div>
                  </div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="password" id="old-password">
                    <label class="mdl-textfield__label" for="old-password">Old Password</label>
                    <!-- <span class="mdl-textfield__error">Invalid Notifier ID</span> -->
                  </div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="password" id="new-password">
                    <label class="mdl-textfield__label" for="new-password">New Password</label>
                    <!-- <span class="mdl-textfield__error">Invalid Password</span> -->
                  </div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="password" id="confirm-new-password">
                    <label class="mdl-textfield__label" for="confirm-new-password">Confirm New Password</label>
                  </div>
                  <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate" style="display: none"></div>
                </div>
                <div class="login-submit">
                  <a class="mdl-button mdl-button--colored mdl-js-button mdl-button--raised mdl-js-ripple-effect">Save</a>
                </div>
              </div>
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
      <script src="./personal.js" charset="utf-8"></script>
  </body>

</html>
