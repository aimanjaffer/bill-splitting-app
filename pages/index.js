import Head from 'next/head'
import Bill from '../components/bill'
import Participants from '../components/participants'
import { useState, useEffect } from 'react';
export default function Home() {
  const [windowReady, setWindowReady] = useState(false);
    useEffect(() => {
        setWindowReady(true);
    }, []);
  return (
    <div>
      <Head>
        <title>Bill Splitting App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Bill/>
      {windowReady && <Participants/>}
    </div>
  )
}
