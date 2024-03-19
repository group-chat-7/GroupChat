import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.boy)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/clients/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "clients", "dist", "index.html"));
});

// app.get("/", (req, res) => {
//   // root route http://localhost:5000/
//   res.send("Hello World!!!");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});


// module.exports = {
//   apps : [{
//       name : "63-server",
//       script : "./app.js",
//           env: {
//               NODE_ENV: "production",
//               PORT: 80,
//               JWT_SECRET: "RahasiaBangetIniMahPliss",
//               MONGO_DB_URI: "mongodb+srv://anjayaderio:zq6CsGf3tvkScqcX@cluster0.qkrcspi.mongodb.net/IP-DeepTalk?retryWrites=true&w=majority&appName=Cluster0",
//               GOOGLE_CLIENT_ID: ""
//           }
//   }]
// } 

export default {
  apps: [{
      name : "63-server",
      script : "./app.js",
          env: {
              NODE_ENV: "production",
              PORT: 80,
              JWT_SECRET: "RahasiaBangetIniMahPliss",
              MONGO_DB_URI: "mongodb+srv://anjayaderio:zq6CsGf3tvkScqcX@cluster0.qkrcspi.mongodb.net/IP-DeepTalk?retryWrites=true&w=majority&appName=Cluster0",
          }
  }]
}