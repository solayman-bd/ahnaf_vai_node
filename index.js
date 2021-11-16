const port = process.env.PORT || 8800;
//external import
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//internal import

const albumRoute = require("./routes/albumRoute.js");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler.js");
const { mongooseConnection } = require("./utils.js");

const app = express();
dotenv.config();

mongooseConnection();

//middleware

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.use("/album", albumRoute);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend is running to port ${port}`);
});
