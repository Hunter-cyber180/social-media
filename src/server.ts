import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

// * ----- Node ENV -----
const mode = process.env.MODE === "production";
if (!mode) dotenv.config();

// * ----- DB Connection -----
async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_NAME as string);
    console.log(`Database Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error in Database Connection: ${error}`);
    process.exit(1);
  }
}

// * ----- Start Server -----
async function startServer() {
  const port = process.env.PORT ? +process.env.PORT : 3000;
  app.listen(port, "127.0.0.1", () =>
    console.log(
      `Server running in ${
        mode ? "production" : "development"
      } mode on localhost:${port}...`
    )
  );
}

// * ----- Run Server -----
const runServer = async () => {
  // connect to database
  await connectToDB();

  // start server
  await startServer();
};

runServer();
