import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NOT_FOUND = 404;
const NOT_FOUND_MESSAGE = "NotFound";
const SERVER_ERROR_MESSAGE = "Failed";

const postsDirectory = path.join(process.cwd(), "posts");

const fetchPosts = async () => {
  const uri = `${process.env.API_ENDPOINT}/posts`;
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

export async function getPostData(id): Promise<IPost> {
  let uri = `${process.env.API_ENDPOINT}/posts`;
  if (id) uri += `/${id}`;
  console.log("uri", uri)
  const res = await fetch(uri, { method: "GET" });
  if (res.status === NOT_FOUND) return { error: NOT_FOUND_MESSAGE };
  else if (!res.ok) return { error: SERVER_ERROR_MESSAGE };

  const result = await res.json();
  console.log("RESPUESTA", result);
  return { data: { ...result, id: id }, error: null };
}

export const getSortedPostsData = async () => {
  const posts = await fetchPosts();
  return posts;
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};
