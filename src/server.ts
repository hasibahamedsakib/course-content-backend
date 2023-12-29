import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

// connecting to mongoose
async function Server() {
  try {
    await mongoose.connect(config.db_url);
    // server listening
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
Server();
