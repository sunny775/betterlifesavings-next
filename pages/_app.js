import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faEnvelope,
  faEllipsisV,
  faShareAlt,
  faCamera,
  faExclamationTriangle,
  faEdit,
  faUserEdit,
  faPencilAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab,
  faCheckSquare,
  faEnvelope,
  faShareAlt,
  faEllipsisV,
  faCamera,
  faExclamationTriangle,
  faEdit,
  faUserEdit,
  faPencilAlt,
  faPhone
);

const theme = {
  bg: {
    primary: " #388e3c",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
