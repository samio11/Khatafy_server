import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

async function startServer() {
  try {
    await mongoose.connect(config.DATABASE as string);
    server = app.listen(config.PORT, () => {
      console.log(`Server runs at port:- ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("UnCaught Exception", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", (err) => {
  console.log("SIGNAL TERMINATION", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
