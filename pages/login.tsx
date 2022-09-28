import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Breadcrumbs from 'components/breadcrumbs'
import Logo from 'components/logo'
import { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box display="flex" alignItems="center" height={112} p={4}>
        <Logo />
        <Breadcrumbs crumbs={[{ href: '/login', label: 'Login' }]} />
      </Box>
      <Box display="flex" flex={1} alignItems="center" justifyContent="center">
        <Container maxWidth="xs">
          <Box display="flex" flexDirection="column" gap={2} component="form">
            <Typography variant="h2">Login</Typography>
            <TextField label="E-mail" type="email" />
            <TextField label="Senha" type="password" />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Link href="/signup" passHref>
                <Button color="secondary" component="a">
                  CRIAR CONTA
                </Button>
              </Link>
              <Button type="submit" variant="contained">
                ENTRAR
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Login
