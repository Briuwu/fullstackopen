const express = require("express");
const app = express();
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

module.exports = app;
