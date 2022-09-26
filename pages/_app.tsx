import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from 'theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { useRouter } from 'next/router'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import createEmotionCache from 'createEmotionCache'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const containerRef = useRef(null)
  const { asPath } = useRouter()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <LocomotiveScrollProvider
          options={{ smooth: true }}
          location={asPath}
          containerRef={containerRef}
          onLocationChange={(scroll: any) => {
            scroll.scrollTo(0, { duration: 0, disableLerp: true })
          }}
          watch={[Component]}
        > */}
        <main data-scroll-container ref={containerRef}>
          <Component {...pageProps} />
        </main>
        {/* </LocomotiveScrollProvider> */}
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
