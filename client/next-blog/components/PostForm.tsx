import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addPost } from "../lib/posts";
import Router from "next/router";

interface ITextInputProps {
  title: string;
  postId: string | number;
}

const PostForm = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (comment) => {
    console.log(comment);
    await addPost({
      title: title,
      body: text,
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(text).then(() => Router.reload());
      }}
    >
      <Form.Group className="mb-3" controlId={`formGroup-newPost`}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Title"}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={`formGroup${title}`}>
        <Form.Label>Post</Form.Label>
        <Form.Control
          onChange={(e) => setText(e.target.value)}
          placeholder={"Post"}
          multiple
        />
      </Form.Group>
      <Button style={{ marginBottom: "12px" }} variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default PostForm;
