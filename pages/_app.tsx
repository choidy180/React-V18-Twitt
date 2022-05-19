import '../styles/global-style.ts';
import Head from 'next/head';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from '../styles/theme';
import { useState } from 'react';
import { authService } from '../firebase/firebase';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next-basics | Next</title>
      </Head>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
