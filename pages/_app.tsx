import '../styles/global-style.ts';
import Head from 'next/head';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from '../styles/theme';
import { useEffect, useState } from 'react';
import { authService } from '../firebase/firebase';
import Nav from '../components/nav';

function MyApp({ Component, pageProps }) {
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // component mount
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  })
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next-basics | Next</title>
      </Head>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} {...isLoggedIn} />
        <footer>&copy;{new Date().getFullYear()}Twitter</footer>
      </ThemeProvider>
    </>
  )
}

export default MyApp
