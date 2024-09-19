import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./app/routers/router.js";
import { sequelize } from "./app/database.js";  

const app = express();

app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);


const port = process.env.PORT || 3000;

// Ajoutez ce bloc de code pour la synchronisation Sequelize
sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.error("Erreur lors de la synchronisation de la base de données:", error);
});

