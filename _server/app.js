var path = require('path');

var express = require('express');
var app = express();
var PROJECT_DIR = path.resolve('../build')

app.use('/js', express.static(path.join(PROJECT_DIR, '/js')) );
app.use('/css', express.static(path.join(PROJECT_DIR, '/css')) );
app.use('/views', express.static(path.join(PROJECT_DIR, '/views')) );
app.use('/partials', express.static(path.join(PROJECT_DIR, '/partials')) );
app.use('/i', express.static(path.join(PROJECT_DIR, '/i')) );

app.get('/', function (req, res) {
    console.log('REQUESTING index.html');
    res.sendFile(path.join(PROJECT_DIR, 'index.html'));
})

app.listen(9000);
