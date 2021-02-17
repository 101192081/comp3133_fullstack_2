const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./usersRoutes');

const app = express();

// Establishing connection with mongoDB
mongoose.connect('mongodb+srv://test:sahil678@cluster0.m8vkf.mongodb.net/gbc_full_stack?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(usersRouter);
app.listen(3000, () => console.log('Server is running on port 3000'));
