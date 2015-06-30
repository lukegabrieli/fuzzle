var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'tennis';

var tennisRoutes = express.Router();
var userRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tennis');

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));

require('./lib/passport_strat')(passport);
require('./routes/tennis_apis')(tennisRoutes);
require('./routes/auth_routes')(userRoutes, passport);

app.use('/api', tennisRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log('Server running on port ' + (process.env.PORT || 3000));
});
