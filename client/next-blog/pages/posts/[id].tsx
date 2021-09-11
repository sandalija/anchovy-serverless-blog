import PostLayout from "../../components/PostLayout";
import { deletePost, getAllPostIds, getPostData } from "../../lib/posts";
import CommentForm from "../../components/CommentForm";
import { addComment } from "../../lib/comments";
import Head from "next/head";
import { Container, Row, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";

export default function Post({ postData, error }) {
  const router = useRouter();
  const title = postData?.title;
  const createdAt = postData.createdAt;
  const id = postData?.id;
  const comments = postData?.comments || [];
  const body = postData?.body || "";
  const [errorDelete, setErrorDelete] = useState("");

  const handleDelete = () => {
    const ok = deletePost(id);
    if (!ok) {
      setErrorDelete("No se ha podido eliminar");
    } else {
      router.push("/");
    }
  };

  if (!postData) {
    return (
      <PostLayout error={error}>
        <p>Post not found</p>
      </PostLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* 
          To avoid duplicate tags in your head you can use the key property, 
          which will make sure the tag is only rendered once, as in the following example:
        */}
        <meta property="og:title" content={title} key="title" />
      </Head>
      <PostLayout error={error || errorDelete}>
        <Container fluid>
          <Row>
            <h1>{title}</h1>
          </Row>
          <Row>
            <p className="wrappable">{body}</p>
          </Row>
          <Row>
            <p className="post-date wrappable">{createdAt}</p>
          </Row>
        </Container>
        <Container fluid>
          <h4>Comments</h4>
          <Row>
            {comments.map((comment) => {
              return <p className="wrappable">{comment.body}</p>;
            })}
          </Row>
          <CommentForm title="Add a comment" postId={postData?.id} />
          <Button variant="outline-danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Container>
      </PostLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await getPostData(params.id);
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
