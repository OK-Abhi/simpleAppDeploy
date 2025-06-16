const fluree = require("@fluree/fluree-client");
const dotenv = require("dotenv")
dotenv.config()

// config needs dynamic configuration for creating the ledger
// config should needs to changed by the user
const config = {
  ledger: "nothing/Test",
  isFlureeHosted: true,
  apiKey: process.env.API_KEY, // api key of fluree hosted service
};

// const client = await new fluree.FlureeClient().configure(config);

const connectDB = async () => {
  try {
    const connectClient = await new fluree.FlureeClient(config).connect(); // takes ledger name if it is not provided in the config
    console.log("CONNECTION SUCCESSFULL WITH FLUREE_DB", connectClient.connected);
  } catch (error) {
    console.log("FLUREE CONNECTION FAILED", error);
    process.exit(1); // exit the current process
  }
};

module.exports = connectDB;
