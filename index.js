const express = require('express');
const socket = require('socket.io');
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static('public'));

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index");
})
var server = app.listen(port, function() {
    console.log(`http://localhost:${port}`);
})

var io = socket(server);

io.on('connection', function(socket) {
    console.log("connection detected: " + socket.id)
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data)
    })
})
