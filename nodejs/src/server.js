import express from "express";
import bodyParser from "body-parser";

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();
import connectDB from "./config/connectDB";
import cors from "cors";
const stripeRoute = require("./route/stripe");

let app = express();
app.use(cors());
app.use("/api/checkout", stripeRoute);

//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080; // nếu chưa có port ở .env thì port = 8080

app.listen(port, () => {
  console.log("Back End Nodejs đang chạy té khối: " + port);
});
