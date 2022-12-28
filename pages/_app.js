import "../styles/globals.css";
import Layout from "../components/layout";
import { Poppins } from "@next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <Layout className={poppins.className}>
      <ToastContainer limit={1} />
      <Component {...pageProps} />
    </Layout>
  );
}
