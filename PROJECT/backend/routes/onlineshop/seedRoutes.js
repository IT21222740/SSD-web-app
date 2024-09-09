const express = require("express");
const data = require("../../data")
const User = require("../../models/UserModel")


const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
   
   
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  });

module.exports = seedRouter;
