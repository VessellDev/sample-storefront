import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from 'theme'
import { CssBaseline } from '@material-ui/core'
import { useEffect, useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { useRouter } from 'next/router'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null)
  const { asPath } = useRouter()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocomotiveScrollProvider
          options={{ smooth: true }}
          location={asPath}
          containerRef={containerRef}
          onLocationChange={(scroll: any) => {
            scroll.scrollTo(0, { duration: 0, disableLerp: true })
          }}
        >
          <main data-scroll-container ref={containerRef}>
            <Component {...pageProps} />
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  )
}
export default MyApp
