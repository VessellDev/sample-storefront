import { Box, Button, CardContent, Typography } from '@mui/material'
import { StepFormProps } from 'components/checkout/step'
import { FC, useEffect } from 'react'
import { useMutation } from 'react-query'
import SDK from 'sdk'

interface BilletFormProps extends StepFormProps {
  code: string
}

const BilletForm: FC<BilletFormProps> = ({
  code,
  onGoBack,
  onSuccess,
  setLoading,
}) => {
  const { mutate, isLoading } = useMutation(
    () =>
      SDK.request('mutation')({
        setPurchasePaymentMethod: [{ paymentMethodCode: code }, { id: true }],
      }),
    { onSuccess },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <CardContent>
        <Box>
          <Typography variant="subtitle1">Boleto</Typography>
          <Typography variant="h4" color="secondary">
            Pagamento no boleto em até 3 dias
          </Typography>
        </Box>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button
          variant="text"
          color="secondary"
          disabled={isLoading}
          onClick={onGoBack}
        >
          VOLTAR
        </Button>
        <Button
          variant="text"
          color="primary"
          disabled={isLoading}
          onClick={() => mutate()}
        >
          CONTINUAR
        </Button>
      </Box>
    </Box>
  )
}

export default BilletForm
