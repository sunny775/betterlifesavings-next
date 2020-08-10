import Head from 'next/head'
import EditProfile from '../../components/screens/edit-profile'


export default function Contact() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditProfile />
    </div>
  )
}
