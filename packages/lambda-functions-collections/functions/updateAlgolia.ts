require("dotenv").config();
import algolia from "algoliasearch";
import { Callback, Handler, Context } from "aws-lambda";
import axios from "axios";

const SETTINGS = {
  algolia: {
    adminKey: process.env.ALGOLIA_ADMIN_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    appId: process.env.ALGOLIA_APP_ID,
  },
  apiUrl: `${process.env.API_URL}/posts`,
};

export function handler(event: Handler, context: Context, callback: Callback) {
  console.log(SETTINGS);

  callback(null, {
    statusCode: 200,
    body: "lol",
  });
}
