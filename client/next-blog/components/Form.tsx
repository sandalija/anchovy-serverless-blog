import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface ITextInputProps {
  onSubmit(event): any;
  title: string;
}

const TextInput = (props: ITextInputProps) => {
  const { onSubmit, title } = props;

  const [text, setText] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text);
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

export default TextInput;
