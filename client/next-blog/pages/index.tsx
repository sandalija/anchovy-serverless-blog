import Head from "next/head";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { siteTitle } from "../components/Layout/Layout";
import { decodeToken, isCurrentUserAdmin } from "../lib/auth/cognito";
//import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import PostForm from "../components/PostForm";

export const Home = ({ allPostsData }): any => {
  const [admin, setAdmin] = useState(false);

<<<<<<< HEAD:client/next-blog/pages/index.tsx
  const getAdmin = async () => {
=======
  const fetchAdmin = async () => {
>>>>>>> 96c600bc01c4bd9dbb9c911ccd7ed467be0c8da8:client/next-blog/pages/index.ts
    setAdmin(await isCurrentUserAdmin());
  };

  useEffect(() => {
<<<<<<< HEAD:client/next-blog/pages/index.tsx
    getAdmin();
  }, []);

  return (
    <Layout home>
      <Container fluid>
        <Row>{admin && <PostForm />}</Row>
      </Container>
      {allPostsData && (
        <section>
          <Container fluid>
            <h1>Posts</h1>
            {allPostsData.map(({ url, id, body, createdAt, title }) => (
              <Row key={id}>
                <Col className="post-preview">
                  <a href={`posts/${id}`}>
                    <h2 className="post-preview-title">
                      <strong>{title}</strong>
                    </h2>
                  </a>
                  {body}
                  <br />
                  {new Date(createdAt).toLocaleString()}
                  <br />
                </Col>
              </Row>
            ))}
          </Container>
        </section>
      )}
    </Layout>
  );
};
=======
    fetchAdmin();
  }, []);

  const handleNewPost = (text) => {
    console.log(text);
  };

  return allPostsData.map(({ url, id, body, createdAt, title }) => (
    <Row key={id}>
      <Col className="post-preview">
        <a href={`posts/${id}`}>
          <h2 className="post-preview-title">
            <strong>{title}</strong>
          </h2>
        </a>
        {body}
        <br />
        {new Date(createdAt).toLocaleString()}
        <br />
      </Col>
    </Row>
  ));
}
>>>>>>> 96c600bc01c4bd9dbb9c911ccd7ed467be0c8da8:client/next-blog/pages/index.ts

/**
 * Runs on each request
 * Logs on next js terminal. not in browser log
 * @returns
 */
export async function getServerSideProps() {
  const allPostsData = await getSortedPostsData();
  console.log("POSTS server side", allPostsData);
  return {
    props: {
      allPostsData: allPostsData || null,
    },
  };
}

export default Home;
