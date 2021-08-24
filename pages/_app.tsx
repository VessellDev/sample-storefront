import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from 'theme'
import { CssBaseline } from '@material-ui/core'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
export default MyApp
