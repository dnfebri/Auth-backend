import express from "express";
import AuthRoute from "./AuthRoute.js";
import UserRoute from "./UserRoute.js";
import ProductRoute from "./ProductRoute.js";

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/products', ProductRoute);

export default router;