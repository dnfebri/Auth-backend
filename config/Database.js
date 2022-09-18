import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});
// const db = new Sequelize("bljr_auth_api", "root", "", {
//   host: "localhost",
//   dialect: "mysql"
// });

export default db;