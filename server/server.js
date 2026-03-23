import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";

import userRouter from "./routes/UserRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRouter.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "https://greencart123.netlify.app",
      "http://localhost:5173"
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});