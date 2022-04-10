const express = require("express");
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app)
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);


console.log(__dirname)
console.log("hello")
app.use(express.static(path.join(__dirname, "src")));

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name: name,
      msg: msg,
      time: moment(new Date()).format("h:mm A")
    })

  })
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running${PORT}`) )