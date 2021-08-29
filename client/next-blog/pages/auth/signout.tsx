import Link from "next/link";
import { cognitoTokens } from "../../constants/cognito";
import Layout from "../../components/Layout/Layout";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";

const SignOut = () => {

  const router = useRouter()
  if (typeof window !== "undefined") {
    // we are running on the client;
    cognitoTokens.forEach((token) => {
      window.localStorage.removeItem(token);
      router.push("/")
    });
  }

  return (
   <Layout>
      <div className="centered">
        <Spinner animation="grow" style={{ width: 104, height: 104}}/>
        <p>Cerrando sesión</p>
      </div>  
    </Layout>
  );
};

export default SignOut;
