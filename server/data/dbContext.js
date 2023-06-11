const mongoose = require('mongoose');
const _ = require('dotenv').config();

const mongooseConnect = async () => {
  const dbUserName = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbCluster = process.env.DB_CLUSTER;
  const dbName = process.env.DB_NAME;
  const dbConnStr = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;
  await mongoose.connect(dbConnStr, {useNewUrlParser: true});
  const mongoDb = mongoose.connection;
  mongoDb.on("error", console.error.bind(console, "Connection Error: "));
  mongoDb.on("open", function () {
    console.log("Database Connection Successful");
  });
};

module.exports = mongooseConnect;