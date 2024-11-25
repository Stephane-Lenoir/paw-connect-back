import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./app/routers/router.js";
import { sequelize } from "./app/database.js";
import "./app/models/associations.js";

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

const allowedOrigins = [
  'http://localhost:3001', // Origine pour le développement
  'https://paw-connect-front-virid.vercel.app' // Origine pour la production
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = process.env.PORT || 3000;

// Ajoutez ce bloc de code pour tester la connexion à la base
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to the database has been established successfully.");

    // Synchronisation de la base de données
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized successfully.");

    // Démarrage du serveur après connexion et synchronisation réussies
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();
