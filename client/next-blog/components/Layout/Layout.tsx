import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import { useEffect } from "react";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { COGNITO_LOGIN, COGNITO_LOGOUT } from "../../constants/cognito";
import { decodeToken } from "../../lib/auth/cognito";
import AuthHeader from "../AuthHeader";
import Navbar from "../Navbar/Navbar";

const name = "Sergio";
export const siteTitle = "Anchovy";

export default function Layout({ children, home = false }) {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <Head>
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
