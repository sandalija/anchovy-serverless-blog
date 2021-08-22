import { useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { decodeToken } from "../lib/auth/cognito";
import { COGNITO_LOGIN, COGNITO_LOGOUT } from "../constants/cognito";
import { FaSignOutAlt } from "react-icons/fa";

const AuthHeader = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState<number>();

  useEffect(() => {
    const getTokens = async () => {
      try {
        const localIdToken: string = localStorage.getItem("id_token");
        const localAccessToken: string = localStorage.getItem("access_token");
        if (!localIdToken || !localAccessToken) {
          throw new Error("Not logged user");
        }
        const id = await decodeToken(localIdToken);
        const access = await decodeToken(localAccessToken);
        console.log(access);
        setEmail(id?.email || "");
        setCreatedAt(access.iat * 1000); // parse epoch
        setError("");
      } catch (e) {
        console.error("Papapaya", e);
        setError(e.message);
      }
    };
    getTokens();
  }, []);

  return (
    <Nav>
      {email && (
        <Navbar.Text>
          <Container>
            <Row>
              <Col xs>Signed in as: {email}</Col>
            </Row>
          </Container>
        </Navbar.Text>
      )}
      {email && (
        <Nav.Link href={COGNITO_LOGOUT}>
          <Container>
            <Row>
              <Col xs>
                Sign out{"  "}
                <FaSignOutAlt width={20} height={20} />
              </Col>
            </Row>
          </Container>
        </Nav.Link>
      )}

      {!email && (
        <Navbar.Text>
          <a href={COGNITO_LOGIN}>{email} Login </a>
        </Navbar.Text>
      )}
    </Nav>
  );
};

export default AuthHeader;
