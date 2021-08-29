import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addPost } from "../lib/posts";

interface ITextInputProps {
  title: string;
  postId: string | number;
}

const PostForm = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (comment) => {
    console.log(comment);
    addPost({
      title: title,
      body: text,
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(text);
      }}
    >
      <Form.Group className="mb-3" controlId={`formGroup-newPost`}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Titulo"}
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
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default PostForm;
