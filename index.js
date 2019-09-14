const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
var path = require("path");

const app = express()
app.use(bodyParser.json())

var engine = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

const startServer = async () => {
  const port = process.env.SERVER_PORT || 3000
  await promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}
app.get('/google9222a60bb58f7b02.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/'+'google9222a60bb58f7b02.html'));
});
app.get('/google_signup', function(req, res) {
    let googleUrlFile = require('./src/google-util.js')
    let googleUrl = googleUrlFile.urlGoogle()
    res.render(__dirname + "/views/auth_button.html", {googleUrl:googleUrl});

});
app.get('/google-auth', function(req, res) {
    //keys = Object.keys(req.params);
   
    let getDetails = require('./src/google-util.js')
    let details =  getDetails.getGoogleAccountFromCode(req.query.code)
    details.then(function(details){
        console.log(details)
        let user = require('./models/user')
        let myData = new user.User(details)
        myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    
    });
});

app.get('/getcustomers',function(req, res){
    let user = require('./models/user')
    user = user.User.find({},function(err, users){
        res.status(200).send(users)
        console.log(users)
    })

})
startServer()
