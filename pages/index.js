import Head from 'next/head'
import HomePage from '../components/screens/home'


export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </div>
  )
}
