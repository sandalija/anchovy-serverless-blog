import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout/Layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {allPostsData && (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ url, id, body, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <a href={`posts/${url}`}>
                  <strong>{title}</strong>
                </a>
                <br />
                {body}
                <br />
                {date}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}

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
      allPostsData,
    },
  };
}
