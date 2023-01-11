import { Box, Button, TextField } from '@mui/material'
import { $ } from '@vessell/sdk/dist/cjs/zeus'
import { StepFormProps } from 'components/checkout/step'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  setLoading,
}) => {
  const { register, handleSubmit } = useForm<CardFormInputs>()

  const { mutate, isLoading } = useMutation(
    async (payload: CardFormInputs) => {
      const { generateCreditCardToken: cardToken } = await SDK.request(
        'mutation',
      )({
        generateCreditCardToken: [
          {
            input: {
              holderName: payload.holderName,
              holderIdentificationNumber: payload.holderIdentificationNumber,
              number: payload.number,
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
    { onSuccess },
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
        />
        <TextField
          {...register('holderIdentificationNumber', { required: true })}
          sx={{ flex: 1 }}
          label="CPF"
        />
      </Box>
      <TextField {...register('number', { required: true })} label="Número" />
      <Box display="flex" width="100%" gap={1}>
        <TextField
          {...register('expiration', { required: true })}
          sx={{ flex: 0.7 }}
          label="Validade"
        />
        <TextField
          {...register('cvv', { required: true })}
          sx={{ flex: 0.3 }}
          label="CVC"
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
