var mongoose = require("../node_modules/mongoose");
mongoose.Promise = global.Promise;

module.exports = { 
    connection : mongoose.connect("mongodb://localhost:27017/nodejsoauth",{ useNewUrlParser: true,   useUnifiedTopology: true
 }),
    mongoose : mongoose
}
