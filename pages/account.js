import Head from "next/head";
import AccountPage from "../components/screens/account";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AccountPage />
    </div>
  );
}
