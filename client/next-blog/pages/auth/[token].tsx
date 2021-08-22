import { GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cognitoTokens } from "../../constants/cognito";

export default function Auth({ children }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
  };

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

  return (
    <Layout>
      {/*  <a href={href} onClick={handleClick} style={style}>
        Enlace {href} {children}
      </a> */}
      <div>
        <h1>Items page</h1>
        {urlSegments.map((segment, key) => {
          return <p key={`token-segment-${key}`}>{segment}</p>;
        })}
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
