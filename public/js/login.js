$(function() {

  var User = function(name, options) {
    this.name = name;
    this.email = options.email;
    this.password = options.password;
    this.neighborhood = options.neighborhood;
    this.skillLevel = options.skillLevel;
    this.gender = options.gender;
  };

  $('#login-form').submit(function(e) {
    e.preventDefault();

    var fuzzleHeadLogin = new User(name, {
      email : $('#login-email').val(),
      password : $('#login-password').val(),
    });

    var filterData = ["email", "password"];

    var fuzzleUserLogin = JSON.stringify(fuzzleHeadLogin, filterData);

    console.log(fuzzleUserLogin);

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/sign_in",
      data: fuzzleUserLogin,
      datatype: 'json',
      contentType: 'application/json',
      success: function() {
        console.log('its a match');
      },
      error: function() {
        console.log('something is wrong');
      }
    });
  });

  $('#create-account-form').submit(function(e) {
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
      type: "POST",
      url: "http://localhost:3000/api/create_user",
      timeout: 2500,
      data: fuzzleUser,
      datatype: 'json',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        console.log('success');
      },
      error: function() {
        console.log('sucks dude');
      }
    });
  });

});
