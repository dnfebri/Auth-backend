import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js"
import ProductRoute from "./routes/ProductRoute.js"

// ## Generate database tables
// import db from "./config/Database.js";
// (async()=>{
//   await db.sync();
// })();

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: "auto"
  }
}));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});