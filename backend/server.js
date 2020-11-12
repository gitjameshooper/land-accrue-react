const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

const usStatesRouter = require("./routes/us-states");
const uploadsRouter = require("./routes/uploads");
const downloadsRouter = require("./routes/downloads");
const usersRouter = require("./routes/users");
const countiesRouter = require("./routes/counties");

app.use("/us-states", usStatesRouter);
app.use("/uploads", uploadsRouter);
app.use("/downloads", downloadsRouter);
app.use("/users", usersRouter);
app.use("/counties", countiesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
