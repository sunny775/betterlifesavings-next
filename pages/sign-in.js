import Head from "next/head";
import SignInModal from "../components/SignIn";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignInModal />
    </div>
  );
}
