import "dotenv/config";

import express from "express";
import cors from "cors";
import { router } from "./app/routers/router.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = process.env.PORT || 3000;
await app.listen(port);
console.log(`🚀 Server listening at http://localhost:${port}`);
