import { Add, ArrowBack } from '@mui/icons-material'
import { Box, Button, CardContent, TextField, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import SDK from 'sdk'
import { StepFormProps } from '../step'

interface AddressFormInputs {
  name: string
  phoneNumber: string
  postalCode: string
  city: string
  state: string
  street: string
  neighborhood: string
  number: string
  complement?: string
}

const AddressForm: FC<StepFormProps> = ({ onSuccess, setLoading, onError }) => {
  const [isCreating, setIsCreating] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<AddressFormInputs>()

  const queryClient = useQueryClient()

  const { data: addresses } = useQuery(['customer-addresses'], async () => {
    const { customerAddresses } = await SDK.request('query')({
      customerAddresses: [
        {},
        {
          id: true,
          postalCode: true,
          city: true,
          state: true,
          street: true,
          neighborhood: true,
          number: true,
          complement: true,
        },
      ],
    })

    return customerAddresses
  })

  const { mutate: createNewAddress, isLoading: isCreateLoading } = useMutation(
    async ({ phoneNumber, postalCode, ...input }: AddressFormInputs) => {
      const { createCustomerAddress } = await SDK.request('mutation')({
        createCustomerAddress: [
          {
            input: {
              ...input,
              phoneNumber: phoneNumber.replace(/\D/g, ''),
              postalCode: postalCode.replace(/\D/g, ''),
            },
          },
          { id: true },
        ],
      })

      setAddress(createCustomerAddress.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['customer-addresses'])
      },
      onError,
    },
  )

  const { mutate: setAddress, isLoading } = useMutation(
    (addressId: string) =>
      SDK.request('mutation')({
        setPurchaseAddress: [{ addressId }, { id: true }],
      }),
    { onSuccess, onError },
  )

  useEffect(() => {
    setLoading(isLoading || isCreateLoading)
  }, [isLoading, isCreateLoading, setLoading])

  if (addresses && addresses.length > 0 && !isCreating)
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="column" gap={1}>
          {addresses.map((address) => (
            <CardContent
              key={address.id}
              sx={{
                cursor: isLoading ? 'default' : 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                },
              }}
              onClick={() => !isLoading && setAddress(address.id)}
            >
              <Box>
                <Typography variant="subtitle1">
                  {address.postalCode}
                </Typography>
                <Typography variant="h4" color="secondary">
                  {address.city} - {address.state}. {address.neighborhood}.{' '}
                  {address.street}, {address.number}. {address.complement}
                  {address.complement ? ` ${address.complement}.` : ''}
                </Typography>
              </Box>
            </CardContent>
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            startIcon={<Add />}
            onClick={() => setIsCreating(true)}
            disabled={isLoading}
          >
            NOVO ENDEREÇO
          </Button>
        </Box>
      </Box>
    )

  if ((addresses && addresses.length === 0) || isCreating)
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        component="form"
        onSubmit={handleSubmit(
          createNewAddress as SubmitHandler<AddressFormInputs>,
        )}
      >
        <Box width="100%" display="flex" gap={1}>
          <TextField
            label="Nome Completo"
            sx={{ flex: 1 }}
            {...register('name', { required: true })}
            error={Boolean(errors.name)}
            helperText={errors.name && 'Insira um nome'}
          />
          <InputMask
            mask="(99)99999-9999"
            {...register('phoneNumber', { required: true })}
            onChange={(e) => setValue('phoneNumber', e.target.value)}
          >
            {() => (
              <TextField
                sx={{ flex: 1 }}
                label="Celular"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber && 'Insira seu telefone'}
              />
            )}
          </InputMask>
        </Box>
        <InputMask
          mask="99.999-999"
          {...register('postalCode', { required: true })}
          onChange={(e) => setValue('postalCode', e.target.value)}
        >
          {() => (
            <TextField
              label="CEP"
              error={Boolean(errors.postalCode)}
              helperText={errors.postalCode && 'Insira o cep'}
            />
          )}
        </InputMask>
        <Box width="100%" display="flex" gap={1}>
          <TextField
            label="Cidade"
            sx={{ flex: 0.7 }}
            {...register('city', { required: true })}
            error={Boolean(errors.city)}
            helperText={errors.city && 'Insira a cidade'}
          />
          <TextField
            label="Estado"
            sx={{ flex: 0.3 }}
            {...register('state', { required: true })}
            error={Boolean(errors.state)}
            helperText={errors.state && 'Insira um estado'}
          />
        </Box>
        <TextField
          label="Bairro"
          {...register('neighborhood', { required: true })}
          error={Boolean(errors.neighborhood)}
          helperText={errors.neighborhood && 'Insira um bairro'}
        />
        <Box width="100%" display="flex" gap={1}>
          <TextField
            label="Rua"
            sx={{ flex: 0.7 }}
            {...register('street', { required: true })}
            error={Boolean(errors.street)}
            helperText={errors.street && 'Insira uma rua'}
          />
          <TextField
            label="Número"
            type="number"
            sx={{ flex: 0.3 }}
            {...register('number', { required: true })}
            error={Boolean(errors.number)}
            helperText={errors.number && 'Insira um número'}
          />
        </Box>
        <TextField label="Complemento" {...register('complement')} />
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent="flex-end"
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => setIsCreating(false)}
            color="secondary"
          >
            VOLTAR
          </Button>
          <Button variant="text" type="submit" disabled={isCreateLoading}>
            CONTINUAR
          </Button>
        </Box>
      </Box>
    )

  return null
}

export default AddressForm
