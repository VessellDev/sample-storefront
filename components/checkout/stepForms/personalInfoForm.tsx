import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  purchase,
  setLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
            input: { name, phoneNumber, identificationNumber },
          },
          { id: true },
        ],
      })
    },
    { onSuccess },
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
        label="Nome"
        {...register('name', { required: true })}
        error={Boolean(errors.name)}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          label="CPF"
          type="number"
          fullWidth
          {...register('identificationNumber', { required: true })}
          error={Boolean(errors.identificationNumber)}
        />
        <TextField
          label="Celular"
          type="number"
          fullWidth
          {...register('phoneNumber', { required: true })}
          error={Boolean(errors.phoneNumber)}
        />
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
