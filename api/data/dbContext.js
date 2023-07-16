const mongoose = require('mongoose');
require('dotenv').config();
async function connectDb() {
  const dbUserName = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbCluster = process.env.DB_CLUSTER;
  const dbName = process.env.DB_NAME;

  if (dbUserName && dbPassword && dbCluster && dbName) {
    const dbConnStr = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;
    mongoose.connect(dbConnStr);
    mongoose.connection.on("error", console.error.bind(console, "Connection Error: "));
    mongoose.connection.on('open', () => console.log('Database Connection Successful'));
  } else {
    console.log("Database Variables not Set");
  }
}

module.exports = {connectDb};