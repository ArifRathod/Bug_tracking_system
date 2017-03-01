    var express = require('express');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mongoose = require('mongoose');
    var app = express();
    var http = require('http').createServer(app);


    var url = "mongodb://127.0.0.1/bugfreepage";
    mongoose.connect(url, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to the database ' + url);
        }
    });

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    app.use(express.static(__dirname + '/public'));

    var router = express.Router();

    router = require('./api/api')(app, express);
    app.use('/api', router);

    app.use('/bower_components', express.static(__dirname + '/bower_components'));

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    var server = http.listen(8888, function () {

        var host = server.address().address;
        var port = server.address().port;

        console.log("Bugfreepage listening at localhost%s:%s", host, port);

    });
