var express = require('express');
var app = express();
var mongoose = require('mongoose');

var tennisRoutes = express.Router();
require('./routes/tennis_apis')(tennisRoutes);
app.use('/api', tennisRoutes);

//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tennis');

app.listen(process.env.PORT || 3000, function(){
	console.log('Server running on port ' + (process.env.PORT || 3000));
});
