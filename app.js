import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./app/routers/router.js";
import { sequelize } from "./app/database.js";
import "./app/models/associations.js";

const app = express();

app.use(express.static("public"));
app.use('/uploads', express.static('public/uploads'));

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

const port = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });