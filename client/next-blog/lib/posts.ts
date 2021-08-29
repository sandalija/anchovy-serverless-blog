import fs from "fs";
import path from "path";
import axios from "axios";

const NOT_FOUND = 404;
const NOT_FOUND_MESSAGE = "NotFound";
const SERVER_ERROR_MESSAGE = "Failed";

const postsDirectory = path.join(process.cwd(), "posts");

const fetchPosts = async () => {
  const uri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`;
  const res = await fetch(uri);
  const result = await res.json();

  return result;
};

export async function getAllPostIds() {
  const posts = await fetchPosts();

  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

interface IPost {
  data?: any;
  error?: string;
}

export interface AddPostParams {
  title: string;
  body: string;
}

export const addPost = async (body: AddPostParams) => {
  const uri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`;
  console.log(uri);
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ ...body }),
  });
  const result = await res.json();
  console.log("RESP");

  return result.data;
};

const getPostUrl = (id?: string | number): string => {
  console.log(process.env);
  let uri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`;
  if (id) uri += `/${id}`;
  console.log(uri);
  return uri;
};

export async function getPostData(id): Promise<IPost> {
  const uri = getPostUrl(id);
  const res = await fetch(uri, { method: "GET" }); // TODO: change to axios
  if (res.status === NOT_FOUND) return { error: NOT_FOUND_MESSAGE };
  else if (!res.ok) return { error: SERVER_ERROR_MESSAGE };

  const result = await res.json();
  console.log("RESPUESTA", result);
  return { data: { ...result, id: id }, error: null };
}

export const getSortedPostsData = async () => {
  const posts = await fetchPosts();
  return posts;
};

export const deletePost = async (id: string | number): Promise<boolean> => {
  const url = getPostUrl(id);

  const response = await axios.delete(url, {
    headers: {
      authorization: localStorage.getItem("access_token"),
    },
  });
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);

  return response.status >= 200 && response.status < 299;
};
