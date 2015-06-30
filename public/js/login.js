$(function() {

  var userName;
  var userList = [];

  var User = function(name) {
    this.name = userName;
    this.email = email;
    this.password = password;
    this.neighborhood = neighborhood;
    this.skillLevel = skillLevel;
    this.gender = gender;
  };

  $('#create-account-form').submit(function(e) {
    e.preventDefault();
    userName = $('#name').val();
    email =$('#email').val();
    password = $('#password').val();
    neighborhood = $('#location').val();
    skillLevel = $('#skill-level').val();
    gender = $('#gender').val();

    userList.push(new User(userName));

    console.log(userList);
  });

});


