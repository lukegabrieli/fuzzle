$(function() {

  var $name = $('#name');
  var $email = $('#email');
  var $neighborhood = $('#location');
  var $goPlay = $('#goPlay');
  var $join = $('#join');

  $name.prop('required', false);
  $email.prop('required', false);
  $neighborhood.prop('required', false);

  var User = function(name, options) {
    this.name = name;
    this.email = options.email;
    this.password = options.password;
    this.neighborhood = options.neighborhood;
    this.skillLevel = options.skillLevel;
    this.gender = options.gender;
  };

  $goPlay.css('visibility', 'hidden');

  // $('#login-form').submit(function(e) {
  //   e.preventDefault();

  //   var fuzzleHeadLogin = new User(name, {
  //     email : $('#login-email').val(),
  //     password : $('#login-password').val(),
  //   });

  //   var filterData = ["email", "password"];

  //   var fuzzleUserLogin = JSON.stringify(fuzzleHeadLogin, filterData);

  //   console.log(fuzzleUserLogin);

  //   $.ajax({
  //     type: 'GET',
  //     url: '/api/sign_in',
  //     data: fuzzleUserLogin,
  //     datatype: 'json',
  //     contentType: 'application/json',
  //     success: function() {
  //       console.log('its a match');
  //     },
  //     error: function() {
  //       console.log('something is wrong');
  //     }
  //   });
  // });

  $('#create-account-form').submit(function(e) {
    var checkCorrect;

    if($name.val() == '') {
      var nameAlert = 'Please list your name';
      $name.prop('class', 'placeholder_error');
      $name.prop('placeholder', nameAlert);
      checkCorrect = 'error';
    }

    if($email.val() == '') {
      var emailAlert = 'Please list your email';
      $email.prop('class', 'placeholder_error');
      $email.prop('placeholder', emailAlert);
      checkCorrect = 'error';
    }

    if($neighborhood.val() == '') {
      var neighborhoodAlert = 'Please list your neighborhood';
      $neighborhood.prop('class', 'placeholder_error');
      $neighborhood.prop('placeholder', neighborhoodAlert);
      checkCorrect = 'error';
    }

    if(checkCorrect === 'error') {
      e.preventDefault();

      if($goPlay.has('p')) {
        $('#form-error').remove();
      }

      $('#confirm-link').remove();
      $goPlay.append('<p id="form-error" class="error_alert">Oops! Please fix form errors.</p>')
      $goPlay.css('visibility', 'visible');

    } else {
      e.preventDefault();

      var fuzzleHead = new User($('#name').val(), {
        email : $('#email').val(),
        password : $('#password').val(),
        neighborhood : $('#location').val(),
        skillLevel : $('#skill-level').val(),
        gender : $('#gender').val()
      });

      var fuzzleUser = JSON.stringify(fuzzleHead);

      console.log(fuzzleUser);

      $.ajax({
        type: 'POST',
        url: '/api/create_user',
        timeout: 2500,
        data: fuzzleUser,
        datatype: 'json',
        contentType: 'application/json',
        success: function(data) {
          console.log(data);
          console.log('success');

          $join.attr('disabled', 'disabled');
        },
        error: function() {
          console.log('sucks dude');
        },
        complete: function() {
          if($goPlay.has('p')) {
            $('#form-error').remove();
          }

          if($goPlay.has('a')) {
            $('#confirm-link').remove();
          }

          $join.text('Congrats! You are now on Fuzzle!');
          $join.attr('class', 'congrats_message');
          $goPlay.append('<a href="people.html" id="confirm-link" class="clearfix">Find a Player</a>')
          $goPlay.css('visibility', 'visible');
          $goPlay.fadeIn();
        }
      });
    }

  });

});
