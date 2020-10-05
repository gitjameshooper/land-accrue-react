const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connected');
})

const statesRouter = require('./routes/states');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

app.use('/states', statesRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});