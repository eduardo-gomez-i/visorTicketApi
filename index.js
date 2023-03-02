"use strict";

var app = require("./app");

var port = 3900;

const server = app.listen(port, "0.0.0.0", () => {
  console.log("servidor corriendo localhost:" + port);
});

const io = require("socket.io")(server);

io.on("connection", function (socket) {
  console.log(socket.id);
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

var request = require("request");
var catalogue;

var checkCatalogue = function () {
  request("http://192.168.0.250/fsanjuan-emmanuel.xml", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (!catalogue) {
        catalogue = body;
      } else {
        if (catalogue === body) {
        } else {
            io.emit('xmlChange', 'algo cambio');
          clearInterval(checkCatalogue);
          catalogue = '';
        }
      }
    }
  });
};

// execute checkCatalogue function once per second
setInterval(checkCatalogue, 1000);
