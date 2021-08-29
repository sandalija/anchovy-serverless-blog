import PostLayout from "../../components/PostLayout";
import { deletePost, getAllPostIds, getPostData } from "../../lib/posts";
import Form from "../../components/Form";
import { addComment } from "../../lib/comments";
import Head from "next/head";
import { Container, Row, Column, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Post({ postData, error }) {
  console.log("DATA", postData);
  const router = useRouter();
  const title = postData?.title;
  const id = postData?.id;
  const comments = postData?.comments || [];
  const body = postData?.body || "";
  const [errorDelete, setErrorDelete] = useState("");

  const handleSubmit = (comment) => {
    console.log(comment);
    addComment(comment, id);
  };

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
      <PostLayout error={error}>
        <Container fluid>
          <Row>
            <h1>{title}</h1>
          </Row>
          <Row>
            <p>{body}</p>
          </Row>
          <Row>
            <p className="post-date">{body}</p>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <p>{comments}</p>
          </Row>
          <Form onSubmit={handleSubmit} title="Añade tu comentario" />
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
