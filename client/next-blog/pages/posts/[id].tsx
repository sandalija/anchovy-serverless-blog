import PostLayout from "../../components/PostLayout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Form from "../../components/Form";
import { Header } from "react-bootstrap";
import { addComment } from "../../lib/posts/comments";

export default function Post({ postData, error }) {
  console.log(postData);
  const title = postData?.title;
  const id = postData?.id;
  const comments = postData?.comments;
  const body = postData?.body;

  const handleSubmit = (comment) => {
    console.log(comment);
    addComment(comment, id);
  };

  if (!postData) {
    return (
      <PostLayout error={error}>
        <p>Post not found</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout error={error}>
      <Header> </Header>
      <p>{body}</p>
      <p>{comments}</p>
      <Form onSubmit={handleSubmit} title="Add title" />
    </PostLayout>
  );
}

export async function getServerSideProps({ params }) {
  const response = await getPostData(params.id);
  console.log("Response", response);
  const data = response?.data || null;
  const error = response?.error || null;
  console.log("PSOT", data, error);
  return {
    props: {
      postData: data,
      error,
    },
  };
}
