// FOR TESTING ONLY
const { FlureeClient } = require("@fluree/fluree-client");

const config = {
  ledger: ``,
  host: ``,
  port: ``,
  create: ``, // true
  privateKey: ``, // for signing messges
  defaultContext: {
    schema: "http://schema.org/",
    name: "schema:name",
    // ...
  },
};

const client = await new FlureeClient().configure(config);
