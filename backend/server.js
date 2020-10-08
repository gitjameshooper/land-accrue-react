const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connected');
})

const usStatesRouter = require('./routes/us-states');
const uploadsRouter = require('./routes/uploads');
const usersRouter = require('./routes/users');

app.use('/us-states', usStatesRouter);
app.use('/uploads', uploadsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});