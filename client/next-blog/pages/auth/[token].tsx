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
      console.log("called created");
      let url: any = window.location.href.split("/");
      url = url[url.length - 1];

      url = url.split("#");

      url = url[url.length - 1];

      url = url.split("&");
      setUrlSegments(url);
      console.log("called created 2", url);
      url.forEach((segment) => {
        segment = segment.split("=");
        console.log("Added", segment);
        localStorage.setItem(segment[0], segment[1]);
        console.log("ST", localStorage.getItem(cognitoTokens[0]));
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
        <p>Iniciando sesión</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: any) {
  console.log("PARAMS", props);
  const { params, query } = props;
  console.log("PARAMS", params);
  return {
    props: {
      params,
      query,
    },
  };
}
