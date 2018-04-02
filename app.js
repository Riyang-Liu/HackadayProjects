/*
 * Name: Projects
 * Author: Riyang Liu
 * Description: A web page that displays some projects from Hackaday. This is a
 *              interview coding challenge from Supplyframe.
 * Date: Mar 31, 2018
 */

var apiData = {};

/********* Hackaday.io API Settings *********/
apiData.clientId = "nk34LzQ92Dz5g6nzA79Ig8bw5h8OTv5RHkn2F0Hhk2IabIgl";
apiData.clientSecret = "ADEgHMEustOflCA4tdbgXcv6BiaIeqQ0ima7O3hvwPIqeyMx";
apiData.userKey = "sraJCr2RPvY5qsAC";

// HAD API URLs:
apiData.apiKey = '?api_key=' + apiData.userKey;
apiData.apiUrl = 'https://api.hackaday.io/v1';
apiData.apiAuthUrl = 'https://api.hackaday.io/v1/me' + apiData.apiKey;
apiData.oAuthRedirect = 'https://hackaday.io/authorize?client_id=' + apiData.clientId + '&response_type=code';
apiData.createTokenUrl = function (code) {
    return ('https://auth.hackaday.io/access_token?' +
    'client_id=' + this.clientId +
    '&client_secret=' + this.clientSecret +
    '&code=' + code +
    '&grant_type=authorization_code');
};

if (!apiData.userKey || !apiData.clientId || !apiData.clientSecret) {
    console.log('Please fill in your client data!  See line 10 in server.js.');
    console.log('Ending node process.');
    process.exit();
}

/*************   Setting up frameworks and libraries **************/
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


/**********  By default, the web goes to project page for now  ********/
app.get("/", function(req, res){
  console.log("Requesting all the projects");
  var projectUrl = apiData.apiUrl + '/projects' + apiData.apiKey;
  var userUrl = apiData.apiUrl + '/users' + apiData.apiKey;
  var user;

  request.get(userUrl, function(error, response, body){

    var bodyData = parseJSON(body);
    user = bodyData;
  });

  request.get(projectUrl, function(error, response, body){

    var bodyData = parseJSON(body);
    console.log(user.users);
    console.log(bodyData.projects);
    res.render("projects", {apiData:[bodyData.projects, user.users]});
  });
});


/**********  Go to project page by /projects ********/
app.get("/projects", function(req, res){
  console.log("Requesting all the projects");
  var projectUrl = apiData.apiUrl + '/projects' + apiData.apiKey;
  var userUrl = apiData.apiUrl + '/users' + apiData.apiKey;
  var user;

  request.get(userUrl, function(error, response, body){

    var bodyData = parseJSON(body);
    user = bodyData;
  });

  request.get(projectUrl, function(error, response, body){

    var bodyData = parseJSON(body);
    console.log(user.users);
    console.log(bodyData.projects);
    res.render("projects", {apiData:[bodyData.projects, user.users]});
  });
});

/********   Listening to ports    ********/
app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("This is the project page");
})

/***********  parse Json function from Hackaday api github ************/
function parseJSON (value) {
    var parsed;
    try {
        parsed = JSON.parse(value);
    } catch (e) {
        console.log('Error parsing JSON: ', e, '\nInput: ', value);
    }
    return parsed || false;
}
