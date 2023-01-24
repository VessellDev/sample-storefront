import { Box, Button, Container, TextField, Typography } from '@mui/material'
import Breadcrumbs from 'components/breadcrumbs'
import Logo from 'components/logo'
import { usePurchase } from 'hooks/usePurchase'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import SDK from 'sdk'

interface LoginForm {
  email: string
  password: string
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>()

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { setupActivePurchaseId } = usePurchase()

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      await SDK.auth.signInWithEmailAndPassword(email, password)
      await setupActivePurchaseId()

      const { redirect, ...query } = router.query
      router.push({ pathname: (redirect as string) || '/', query })

      enqueueSnackbar('Bem-vindo de volta', { variant: 'success' })
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        return enqueueSnackbar('Senha incorreta', { variant: 'error' })
      }

      if (err.code === 'auth/user-not-found') {
        return enqueueSnackbar('E-mail incorreto', { variant: 'error' })
      }

      enqueueSnackbar('Houve um problema, tente novamente mais tarde', {
        variant: 'error',
      })
    }
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box display="flex" alignItems="center" height={112} p={4}>
        <Logo />
        <Breadcrumbs crumbs={[{ href: '/login', label: 'Entrar' }]} />
      </Box>
      <Box display="flex" flex={1} alignItems="center" justifyContent="center">
        <Container maxWidth="xs">
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h2">Entrar</Typography>
            <TextField
              label="E-mail"
              type="email"
              {...register('email', { required: true })}
              error={Boolean(errors.email)}
            />
            <TextField
              label="Senha"
              type="password"
              {...register('password', { required: true })}
              error={Boolean(errors.password)}
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Link
                href={`/signup${
                  router.query.redirect
                    ? `?redirect=${router.query.redirect}`
                    : ''
                }`}
                passHref
              >
                <Button disabled={isSubmitting} color="secondary" component="a">
                  CRIAR CONTA
                </Button>
              </Link>
              <Button disabled={isSubmitting} type="submit" variant="contained">
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
