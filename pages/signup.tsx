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

interface SignupForm {
  name: string
  email: string
  password: string
}

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupForm>()

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { setupActivePurchaseId } = usePurchase()

  const onSubmit: SubmitHandler<SignupForm> = async ({
    name,
    email,
    password,
  }) => {
    try {
      await SDK.auth.createUserWithEmailAndPassword(name, email, password)
      await setupActivePurchaseId()

      const { redirect, ...query } = router.query
      router.push({ pathname: (redirect as string) || '/', query })

      enqueueSnackbar('Seja bem-vindo', { variant: 'success' })
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        return enqueueSnackbar('Ja existe um e-mail com essa conta', {
          variant: 'error',
        })
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
        <Breadcrumbs crumbs={[{ href: '/signup', label: 'Criar Conta' }]} />
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
            <Typography variant="h2">Criar Conta</Typography>
            <TextField
              label="Nome"
              type="name"
              {...register('name', { required: true })}
              error={Boolean(errors.name)}
            />
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
                href={`/login${
                  router.query.redirect
                    ? `?redirect=${router.query.redirect}`
                    : ''
                }`}
                passHref
              >
                <Button disabled={isSubmitting} color="secondary" component="a">
                  ENTRAR
                </Button>
              </Link>
              <Button disabled={isSubmitting} type="submit" variant="contained">
                CRIAR CONTA
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Signup
