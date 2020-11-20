const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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
  app.use(express.static("./../build"));
  app.get("*", (req, res) => {});
}

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
