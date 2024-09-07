const mongoose = require("mongoose");
let { db_User, db_pass, NODE_ENV } = process.env;
let DBName = NODE_ENV === "production" ? "production" : "development";
// export const DB_URL = `"mongodb+srv://david:david123@personal.mlrfxnw.mongodb.net/${DBName}?retryWrites=true&w=majority`;
export const DB_URL = `mongodb://localhost:27017/ashharProject`;

let connection = {};

export async function DBConnect() {
  if (connection.isConnected) {
    console.log(`Already connected to the :"${NODE_ENV}" database`);
    return;
  }
  try {
    if (!connection.isConnected) {
      // Attempt to connect to the database
      const db = await mongoose.connect(DB_URL || "", {});
      connection.isConnected = db.connections[0].readyState;
      console.log(`New "${NODE_ENV}" database connection created successfully`);
    } else {
      console.log(` "${NODE_ENV}" Database connection already exists`);
    }
  } catch (error) {
    console.error(`L-24DB, ${NODE_ENV} DB connection Failed :`, error);
    // Graceful exit in case of a connection error
    // process.exit(1);
  }
}
