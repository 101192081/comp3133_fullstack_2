const express = require('express');
const mongoose = require('mongoose');
const mongoPath = require('./config');
const usersRouter = require('./usersRoutes');

const app = express();

// Establishing connection with mongoDB
mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(usersRouter);
app.listen(3000, () => console.log('Server is running on port 3000'));
