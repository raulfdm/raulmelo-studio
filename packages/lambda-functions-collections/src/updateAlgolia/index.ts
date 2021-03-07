import "regenerator-runtime/runtime.js";
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
  apiUrl: `${process.env.API_URL}/graphql`,
};

export async function updateAlgolia(
  event: Handler,
  context: Context,
  callback: Callback
) {
  const posts = await fetchAllPosts();

  console.log(posts);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(posts),
  });
}

type Post = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  language: string;
  slug: string;
  content: string;
  featured_image: {
    width: number;
    height: number;
    url: string;
  };
};

type GraphqlResponsePosts = {
  data: {
    data: {
      posts: Post[];
    };
  };
};

async function fetchAllPosts(): Promise<Post[]> {
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

  return posts as Post[];
}

function buildAlgoliaObject(posts: Post[]);
