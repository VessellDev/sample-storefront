import { Box, Button, TextField } from '@mui/material'
import { $ } from '@vessell/sdk/dist/cjs/zeus'
import { StepFormProps } from 'components/checkout/step'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useMutation } from 'react-query'
import SDK from 'sdk'

interface CardFormProps extends StepFormProps {
  code: string
  installments: number
}

interface CardFormInputs {
  holderName: string
  holderIdentificationNumber: string
  number: string
  expiration: string
  cvv: string
}

const CardForm: FC<CardFormProps> = ({
  code,
  installments,
  onGoBack,
  onSuccess,
  onError,
  setLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CardFormInputs>()

  const { mutate, isLoading } = useMutation(
    async (payload: CardFormInputs) => {
      const { generateCreditCardToken: cardToken } = await SDK.request(
        'mutation',
      )({
        generateCreditCardToken: [
          {
            input: {
              holderName: payload.holderName,
              holderIdentificationNumber:
                payload.holderIdentificationNumber.replace(/\D/g, ''),
              number: payload.number.replace(/\D/g, ''),
              expirationMonth: parseInt(payload.expiration.split('/')[0]),
              expirationYear: parseInt(payload.expiration.split('/')[1]),
              cvv: payload.cvv,
            },
            paymentMethodCode: code,
          },
          true,
        ],
      })

      await SDK.request('mutation')(
        {
          setPurchasePaymentMethod: [
            {
              paymentMethodCode: code,
              additionalData: $('additionalData', 'JSONObject'),
            },
            { id: true },
          ],
        },
        {
          variables: {
            additionalData: {
              installments,
              cardToken,
            },
          },
        },
      )
    },
    { onSuccess, onError },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      component="form"
      onSubmit={handleSubmit(mutate as SubmitHandler<CardFormInputs>)}
    >
      <Box display="flex" width="100%" gap={1}>
        <TextField
          {...register('holderName', { required: true })}
          sx={{ flex: 1 }}
          label="Nome"
          error={Boolean(errors.holderName)}
          helperText={errors.holderName && 'Insira o nome'}
        />
        <InputMask
          mask="999.999.999-99"
          {...register('holderIdentificationNumber', { required: true })}
          onChange={(e) =>
            setValue('holderIdentificationNumber', e.target.value)
          }
        >
          {() => (
            <TextField
              sx={{ flex: 1 }}
              label="CPF"
              error={Boolean(errors.holderIdentificationNumber)}
              helperText={errors.holderIdentificationNumber && 'Insira o CPF'}
            />
          )}
        </InputMask>
      </Box>
      <InputMask
        mask="9999 9999 9999 9999"
        {...register('number', { required: true })}
        onChange={(e) => setValue('number', e.target.value)}
      >
        {() => (
          <TextField
            label="Número"
            error={Boolean(errors.number)}
            helperText={errors.number && 'Insira o número'}
          />
        )}
      </InputMask>
      <Box display="flex" width="100%" gap={1}>
        <InputMask
          mask="99/9999"
          {...register('expiration', { required: true })}
          onChange={(e) => setValue('expiration', e.target.value)}
        >
          {() => (
            <TextField
              sx={{ flex: 0.7 }}
              label="Validade"
              error={Boolean(errors.expiration)}
              helperText={errors.expiration && 'Insira a validade'}
            />
          )}
        </InputMask>
        <TextField
          {...register('cvv', { required: true })}
          sx={{ flex: 0.3 }}
          type="number"
          label="CVC"
          error={Boolean(errors.cvv)}
          helperText={errors.cvv && 'Insira o CVC'}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="text" color="secondary" onClick={onGoBack}>
          VOLTAR
        </Button>
        <Button variant="text" type="submit" disabled={isLoading}>
          CONTINUAR
        </Button>
      </Box>
    </Box>
  )
}

export default CardForm
