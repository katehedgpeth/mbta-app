var express = require('express');
    bodyParser = require('body-parser'),
    morgan    = require('morgan'),
    path       = require('path'),
    assets = require('connect-assets'),
    csv = require('csv'),
    request = require('request'),
    datetime = require("node-datetime");

var app = express();
var apiBaseUrl = '/api/v1'

app.use('templates', express.static('built/templates'));
app.use(express.static('built'));
app.use(morgan('combined'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', __dirname + '/app/views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('index');
});

app.route(`${apiBaseUrl}/trains`)
  .get((req, res) => {
    request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', (error, response, body) => {
        if (response.statusCode === 200) {
          var lines = body.split('\n');
          var headers;
          var json = {
            northStation: [],
            southStation: []
          };
          for (var i=0; i<lines.length; i++) {
            var line = lines[i].split('\,')
            console.log(line)
            line = line.map(header => header.replace(/\"/g, '').replace(/\r/g, '').toLowerCase());

            if (i === 0) {
              json.headers = line;
            } else {
              var obj = {};
              line.forEach((val, idx) => {
                obj[json.headers[idx]] = val;
              })
              var time = new Date(parseInt(obj.scheduledtime) * 1000);
              var scheduled = datetime.create(time).format('I:M');
              obj.scheduledtime = scheduled;
              if (obj.origin == 'north station') {
                json.northStation.push(obj);
              } else {
                json.southStation.push(obj);
              }
            }
          }
          res.send(json);
        }
        else {
          res.send(error)
        }
    });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});