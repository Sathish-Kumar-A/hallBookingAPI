var express = require('express');
var router = express.Router();

const rooms = [];
router.get("/rooms", (req, res) => {
  res.send(rooms);
})
router.get("/customers", (req, res) => {
  let result = [];
  rooms.filter((room) => {
    if (room.booked) {
      result.push({
        customer_name: room.customer_name,
        room_name: room.id,
        date: room.date,
        startTime: room.startTime,
        endTime: room.endTime
      })
    }
  })
  if (result.length) {
    res.send(result);
  } else {
    res.send("No room is booked");
  }
})

router.post("/createroom", (req, res) => {
  let room = req.body;
  let id = rooms.length + 1;
  let room_name = id
  room = {
    ...room,
    id,
    room_name
  };
  rooms.push(room);
  res.send("Room successfully created");
})

router.put("/bookroom/:id", (req, res) => {
  let customerDetails = req.body;
  let date = new Date();
  customerDetails.date = date;

  let id = req.params.id;
  console.log(id)
  if (id <= rooms.length) {
    if (rooms[id - 1].booked) {
      res.send("Room already booked");
    } else {
      rooms[id - 1] = {
        ...rooms[id - 1],
        ...customerDetails,
        booked: true
      }
      res.send("Room successfully booked");
    }
  } else {
    res.send("Room not found");
  }
})

module.exports = router;
