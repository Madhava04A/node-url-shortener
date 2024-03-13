const express = require("express");
const mongoooseconnect = require("./dbConnect");
const app = express();
const path = require("node:path");

mongoooseconnect("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const urlRouter = require("./routes/urlroute");
const htmlRoute = require("./routes/htmlRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.use("/", htmlRoute);

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
