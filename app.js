import express from "express";
import cors from "cors";
import  dotenv  from "dotenv";
import logger from "morgan";

import {macaronsRoute} from "./routes/macarons-route.js";
import {adminRoute}from "./routes/admin-route.js";
import {mochiRoute}from "./routes/mochi-route.js";
import {otherRoute}from "./routes/other-route.js";

dotenv.config();

const app = express();
const formatsLogger = app.get('evn') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use("/api/macarons", macaronsRoute);
app.use("/api/mochi", mochiRoute);
app.use("/api/other", otherRoute);
app.use("/api/admin", adminRoute);
// app.use("/api/thematic", thematicRoute)


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
