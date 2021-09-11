import Router from "next/router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addComment } from "../lib/comments";

interface ITextInputProps {
  title: string;
  postId: string | number;
}

const CommentFrom = (props: ITextInputProps) => {
  const { postId, title } = props;

  const [text, setText] = useState("");

  const handleSubmit = async (comment) => {
    console.log("creating", comment);
    await addComment(comment, postId);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        console.log("summiting");
        handleSubmit(text);
      }}
    >
      <Form.Group className="mb-3" controlId={`formGroup${title}`}>
        <Form.Label>{title}</Form.Label>
        <Form.Control
          onChange={(e) => setText(e.target.value)}
          placeholder={title}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default CommentFrom;
