import "dotenv/config";

import express from "express";
import cors from "cors";
import { router } from "./app/routers/router.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3001", // URL front
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = process.env.PORT || 3001;
await app.listen(port);
console.log(`🚀 Server listening at http://localhost:${port}`);
