var path = require('path');
const mongo = require(path.resolve( __dirname,'./connection'))
var schema = new mongo.mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    picture: String,
    password: String
});

var User = mongo.mongoose.model("User",schema);


module.exports = { User}


