import { Box, Button, CardContent, Typography } from '@mui/material'
import { StepFormProps } from 'components/checkout/step'
import { FC, useEffect } from 'react'
import { useMutation } from 'react-query'
import SDK from 'sdk'

interface PixFormProps extends StepFormProps {
  code: string
}

const PixForm: FC<PixFormProps> = ({
  code,
  onGoBack,
  onSuccess,
  onError,
  setLoading,
}) => {
  const { mutate, isLoading } = useMutation(
    () =>
      SDK.request('mutation')({
        setPurchasePaymentMethod: [{ paymentMethodCode: code }, { id: true }],
      }),
    { onSuccess, onError },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <CardContent>
        <Box>
          <Typography variant="subtitle1">PIX</Typography>
          <Typography variant="h4" color="secondary">
            Pagamento no PIX em até 3 dias
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

export default PixForm
