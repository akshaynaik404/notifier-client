import $ from 'jQuery';
$.ajax({
  type: 'POST',
  data: {
    remember_user: ''
  },
  url: '/server/personal_home.php'
}).done(function(data) {
  if ($.trim(data) === '0') {
    alert('Login First');
    location.href = './index.html';
  }
});
