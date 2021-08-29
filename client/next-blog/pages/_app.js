import '../styles/App.modules.scss'
import "../styles/app.module.css"

// import "../styles/globals.scss";
//import "../styles/main.module.scss"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
