require("dotenv").config();
const algolia = require("algoliasearch");
const axios = require("axios");

const SETTINGS = {
  algolia: {
    adminKey: process.env.ALGOLIA_ADMIN_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    appId: process.env.ALGOLIA_APP_ID,
  },
  apiUrl: `${process.env.API_URL}/posts`,
};

exports.handler = (event, context, callback) => {
  console.log(SETTINGS);

  console.log("LOL");
  callback(null, {
    statusCode: 200,
    body: "lol",
  });

  // if (event.httpMethod === "GET") {
  //   // do something
  // }
};
