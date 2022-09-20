import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";

import indexRoute from "./routes/index.js";

// // ## Generate database tables
import db from "./config/Database.js";
// (async()=>{
//   await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
})

dotenv.config();

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: "auto"
  }
}));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(indexRoute);

// store.sync(); // Generete table session (active kan jika belum ada table nya di database)

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});