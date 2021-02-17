const express = require('express');
const usersModel = require('./models/users');
const app = express();

// Inserting users to mongoDB
app.post('/users', async(req, res) => {
  const user = new usersModel(req.body);

  try{
    await user.save((error) => {
      // if error occurs while saving send error otherwise send the user that is saved
      if(error) {
        res.send(error);
      } else {
        res.send(user);
      }
    });
  } catch(error) {
    res.status(500).send(error); // Internal Server Errors
  }
});

// Getting all users from mongoDB
app.get('/users', async(req, res) => {
  const users = await usersModel.find({});

  try{
    res.send(users);
  } catch(error) {
    res.status(500).send(error); // Internal Server Error
  }
});

module.exports = app;