const Product = require("../models/orderModel");
const User = require("../models/UserModel");
const mongoose = require('mongoose')
const data =require( "../data.js")
const  setproducts = async(req , res) => {
  
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

}
module.exports = {
    setproducts
  }