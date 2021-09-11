import { GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cognitoTokens } from "../../constants/cognito";
import { Container, Row, Spinner } from "react-bootstrap";

export default function Auth({ children }) {
  const router = useRouter();
  const [urlSegments, setUrlSegments] = useState([]);

  useEffect(() => {
    const createSegments = () => {
      let url: any = window.location.href.split("/");
      url = url[url.length - 1];

      url = url.split("#");

      url = url[url.length - 1];

      url = url.split("&");
      setUrlSegments(url);
      url.forEach((segment) => {
        segment = segment.split("=");
        localStorage.setItem(segment[0], segment[1]);
      });
    };
    createSegments();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("id_token")
    ) {
      router.push("/");
    }
  }, [urlSegments]);

  return (
    <Layout>
      <div className="centered">
        <Spinner animation="grow" style={{ width: 104, height: 104 }} />
        <p>Logging in</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: any) {
  const { params, query } = props;
  return {
    props: {
      params,
      query,
    },
  };
}
