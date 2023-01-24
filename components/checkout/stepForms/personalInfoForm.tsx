import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useMutation } from 'react-query'
import SDK from 'sdk'
import { StepFormProps } from '../step'

interface PersonalInfoFormInputs {
  name: string
  phoneNumber: string
  identificationNumber: string
}

const PersonalInfoForm: FC<StepFormProps> = ({
  onSuccess,
  onError,
  purchase,
  setLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersonalInfoFormInputs>({ defaultValues: purchase.customer })

  const { mutate, isLoading } = useMutation(
    async ({
      name,
      phoneNumber,
      identificationNumber,
    }: PersonalInfoFormInputs) => {
      return SDK.request('mutation')({
        updateCustomer: [
          {
            input: {
              name,
              phoneNumber: phoneNumber.replace(/\D/g, ''),
              identificationNumber: identificationNumber.replace(/\D/g, ''),
            },
          },
          { id: true },
        ],
      })
    },
    { onSuccess, onError },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      component="form"
      onSubmit={handleSubmit(mutate as SubmitHandler<PersonalInfoFormInputs>)}
    >
      <TextField
        label="Nome Completo"
        {...register('name', { required: true })}
        error={Boolean(errors.name)}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <InputMask
          mask="999.999.999-99"
          {...register('identificationNumber', { required: true })}
          onChange={(e) => setValue('identificationNumber', e.target.value)}
        >
          {() => (
            <TextField
              label="CPF"
              fullWidth
              error={Boolean(errors.identificationNumber)}
              helperText={
                errors.identificationNumber && 'Insira seu CPF para continuar'
              }
            />
          )}
        </InputMask>
        <InputMask
          mask="(99)99999-9999"
          {...register('phoneNumber', { required: true })}
          onChange={(e) => setValue('phoneNumber', e.target.value)}
        >
          {() => (
            <TextField
              label="Celular"
              fullWidth
              error={Boolean(errors.phoneNumber)}
              helperText={
                errors.phoneNumber && 'Insira seu telefone para continuar'
              }
            />
          )}
        </InputMask>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <LoadingButton variant="text" type="submit" disabled={isLoading}>
          CONTINUAR
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default PersonalInfoForm
