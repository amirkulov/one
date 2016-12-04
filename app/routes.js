module.exports = function(app) {

  var querystring = require('querystring');
  var http = require('http');

    // =====================================
    // HOME PAGE ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.post('/auth/mail', function(req, res) {
      var mail = req.body.mail;
      var pass = req.body.pass;
      var submit = req.body.submit;

      // Запрос на авторизацию
      var data = querystring.stringify({
         AUTH_FORM: 'Y',
         TYPE: 'AUTH',
         backurl: '/auth/',
         USER_LOGIN: mail,
         USER_PASSWORD: pass,
         Login: 'Войти'
       });

       var options = {
         host: 'stmegi.com',
         port: 80,
         path: '/auth/?login=yes',
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': Buffer.byteLength(data)
         }
       };

       var httpreq = http.request(options, function (response) {
         response.setEncoding('utf8');
         response.on('data', function (chunk) {
           console.log("body: " + chunk);
         });
         response.on('end', function() {
           res.send('ok');
         })
       });
       httpreq.write(data);
       httpreq.end();



    //  res.redirect('/');
    });

};
