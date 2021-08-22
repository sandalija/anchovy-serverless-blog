import Layout from "./Layout/Layout";
import { Alert } from "react-bootstrap";

interface PostLayout {
  children: any;
  error: string;
}

const PostLayout = (props: PostLayout) => {
  const { children, error } = props;

  return (
    <Layout>
      {error ? <Alert variant="danger">{error}</Alert> : <p>{children}</p>}
    </Layout>
  );
};

export default PostLayout;
