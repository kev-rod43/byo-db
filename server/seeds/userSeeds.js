const { User } = require("../models");
const collectionData = require("./collectionSeeds");

const users = [
  {
    username: "cooldude25",
    email: "cooldude25@gmail.com",
    password: "password123",
    collections: collectionData,
  },
];

const newUserData = User.insertMany(users);
