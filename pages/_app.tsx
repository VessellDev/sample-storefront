import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from 'theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import createEmotionCache from 'createEmotionCache'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider autoHideDuration={5000}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
export default MyApp
