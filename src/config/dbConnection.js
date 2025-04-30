const fluree = require("@fluree/fluree-client");

// config needs dynamic configuration for creating the ledger
// config should needs to changed by the user
const config = {
  host: "localhost",
  port: 8090, // needs to be changed to .env or something else
  ledger: `${ledgerName}`,
  isFlureeHosted: true,
  apiKey: process.env.API_KEY, // api key of fluree hosted service
};

const client = await new fluree.FlureeClient().configure(config);

const connectDB = async () => {
  try {
    const connectClient = await new fluree.FlureeClient({
      ledger: `${ledgerName}`,
      isFlureeHosted: true,
      apiKey: process.env.FLUREE_API_KEY,
    }).connect(); // takes ledger name if it is not provided in the config
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
