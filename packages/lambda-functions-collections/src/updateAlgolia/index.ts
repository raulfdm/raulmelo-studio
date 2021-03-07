import "regenerator-runtime/runtime.js";
require("dotenv").config();
import algolia from "algoliasearch";
import { Callback, Handler, Context } from "aws-lambda";
import axios from "axios";
import { AlgoliaObject, GraphqlResponsePosts, Post, Posts } from "./types";

const SETTINGS = {
  algolia: {
    adminKey: process.env.ALGOLIA_ADMIN_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    appId: process.env.ALGOLIA_APP_ID,
  },
  apiUrl: `${process.env.API_URL}/graphql`,
};

export async function updateAlgolia(
  event: Handler,
  context: Context,
  callback: Callback
) {
  const posts = await fetchAllPosts();
  const algoliaObjList = buildAlgoliaObjects(posts);

  console.log(algoliaObjList);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(algoliaObjList),
  });
}

async function fetchAllPosts(): Promise<Posts> {
  const query = `
  {
    posts {
      id
      title
      subtitle
      date
      language
      slug
      content
      featured_image {
        width
        height
        url
      }
    }
  }  
  `;

  const response = (await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    url: SETTINGS.apiUrl,
    data: JSON.stringify({ query }),
  })) as GraphqlResponsePosts;

  const { posts } = response.data.data;

  return posts as Posts;
}

function buildAlgoliaObjects(posts: Posts): AlgoliaObject[] {
  return posts.map(objectCreator);

  function objectCreator(post: Post): AlgoliaObject {
    const { id, featured_image, content, ...rest } = post;

    const result: AlgoliaObject = {
      id,
      objectID: `Post_${id}`,
      excerpt: content.slice(0, 5000),
      ...rest,
    };

    if (featured_image) {
      result.featured_image = featured_image;
    }

    return result;
  }
}
