import express from "express";
import authUser from "../middlewares/authUser.js"
import authSeller from "../middlewares/authSeller.js";
import { getAllOrder, getUserOrder, placeOrderCOD } from "../controllers/orderController.js";

const orderRouter=express.Router()

orderRouter.post("/cod",authUser,placeOrderCOD);
orderRouter.get("/user",authUser,getUserOrder);
orderRouter.get("/seller",authSeller,getAllOrder)

export default orderRouter;