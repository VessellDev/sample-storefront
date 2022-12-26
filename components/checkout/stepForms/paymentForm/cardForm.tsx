import { Box, Button, TextField } from '@mui/material'
import { StepFormProps } from 'components/checkout/step'
import { FC, useEffect } from 'react'
import { useMutation } from 'react-query'
import SDK from 'sdk'

interface CardFormProps extends StepFormProps {
  code: string
  installments: number
}

const CardForm: FC<CardFormProps> = ({
  code,
  installments,
  onGoBack,
  onSuccess,
  setLoading,
}) => {
  const { mutate, isLoading } = useMutation(
    () =>
      SDK.request('mutation')({
        setPurchasePaymentMethod: [
          {
            paymentMethodCode: code,
            additionalData: {
              installments,
              cardToken: '', //This fkn shit here
            },
          },
          { id: true },
        ],
      }),
    { onSuccess },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <TextField label="Nome" />
      <TextField label="Número" />
      <Box display="flex" width="100%" gap={1}>
        <TextField sx={{ flex: 0.7 }} label="Validade" />
        <TextField sx={{ flex: 0.3 }} label="CVC" />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button variant="text" color="secondary" onClick={onGoBack}>
          VOLTAR
        </Button>
        <Button variant="text" onClick={onSuccess}>
          CONTINUAR
        </Button>
      </Box>
    </Box>
  )
}

export default CardForm
