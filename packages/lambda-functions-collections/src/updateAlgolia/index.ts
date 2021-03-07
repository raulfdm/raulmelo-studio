require("dotenv").config();

import algolia from "algoliasearch";
import axios from "axios";
import "regenerator-runtime/runtime.js";
import {
  AlgoliaObject,
  AlgoliaObjectList,
  FunctionReturn,
  GraphqlResponsePosts,
  Post,
  Posts,
} from "./types";

const SETTINGS = {
  algolia: {
    adminKey: process.env.ALGOLIA_ADMIN_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    appId: process.env.ALGOLIA_APP_ID,
  },
  apiUrl: `${process.env.API_URL}/graphql`,
};

export async function updateAlgolia(): Promise<FunctionReturn> {
  try {
    const posts = await fetchAllPosts();
    const algoliaObjList = buildAlgoliaObjects(posts);
    await pushAlgoliaData(algoliaObjList);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Indexes updated!", date: new Date() }),
    };
  } catch (error) {
    console.error(`Error while updating indexes:`, error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong. Check the logs",
        date: new Date(),
      }),
    };
  }
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

function buildAlgoliaObjects(posts: Posts): AlgoliaObjectList {
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

function pushAlgoliaData(data: AlgoliaObjectList) {
  const client = algolia(SETTINGS.algolia.appId!, SETTINGS.algolia.adminKey!);

  const index = client.initIndex(SETTINGS.algolia.indexName!);

  return index.saveObjects(data);
}
