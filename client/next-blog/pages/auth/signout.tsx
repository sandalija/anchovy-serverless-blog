import Link from "next/link";
import { cognitoTokens } from "../../constants/cognito";

const SignOut = () => {
  if (typeof window !== "undefined") {
    console.log("we are running on the client");
    cognitoTokens.forEach((token) => {
      window.localStorage.removeItem(token);
    });
  }

  return (
    <div>
      <p>Your session is closes</p>
      <Link href="/">
        <a>About Us</a>
      </Link>
    </div>
  );
};

export default SignOut;
