const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const proxy = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../client/build", "index.html"));
  });
}

const usStatesRouter = require("./routes/us-states");
const uploadsRouter = require("./routes/uploads");
const downloadsRouter = require("./routes/downloads");
const usersRouter = require("./routes/users");
const countiesRouter = require("./routes/counties");

app.use(proxy(["/api"], { target: "http://localhost:5000" }));
app.use("api/us-states", usStatesRouter);
app.use("api/uploads", uploadsRouter);
app.use("api/downloads", downloadsRouter);
app.use("api/users", usersRouter);
app.use("api/counties", countiesRouter);

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
