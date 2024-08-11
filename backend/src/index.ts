import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/connnectDb";
import errorHandlerMiddleware from "./middleware/errormiddleware";
import notFound from "./middleware/notfound";

const app = express();
const port = process.env.PORT || 4000;
// security e.t.c

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);

// Handle 404
app.use(notFound);

// Error handling middleware
app.use(errorHandlerMiddleware);

const start = async () => {
  const mongoUri = process.env.MONGODB_URI!;

  try {
    await connectDB(mongoUri);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
