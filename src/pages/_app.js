import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core';
import Router from 'next/router';
import { useState, useEffect } from 'react';


function Loading() {
  const [loading, setLoading] = useState(false);

  Router.onRouteChangeStart = () => {
    console.log('onRouteChangeStart triggered');
  };

  Router.onRouteChangeComplete = () => {
    console.log('onRouteChangeComplete triggered');

  };

  Router.onRouteChangeError = () => {
    console.log('onRouteChangeError triggered');

  };
  return loading && (
    <div className='w-48 h-48 fixed flex justify-center items-center top-0 left-0 bg-white z-10'>
      <div className='absolute' style={{ left: "50%", top: "50%" }}>
        loading....
      </div>
    </div>
  )
}

export default function App({ Component, pageProps }) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'light',
    }}
  >
    <><Loading /><Component {...pageProps} /></>
  </MantineProvider>

}
