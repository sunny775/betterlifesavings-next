import Head from 'next/head'
import {PolicyTerms} from '../components/screens/policy'


export default function Policy() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PolicyTerms />
    </div>
  )
}
