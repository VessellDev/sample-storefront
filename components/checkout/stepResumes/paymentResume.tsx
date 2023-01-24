import { CreditCard } from '@mui/icons-material'
import { Box, CardContent, Typography } from '@mui/material'
import { PaymentMethodGroup } from '@vessell/sdk/dist/cjs/zeus'
import { usePaymentLabel } from 'hooks/usePaymentMethodLabel'
import { FC } from 'react'
import Installment from '../installment'
import { StepResumeProps } from '../step'

const PaymentResume: FC<StepResumeProps> = ({ onClick, purchase }) => {
  const { getLabel, getIcon } = usePaymentLabel()

  return (
    <Box display="flex" flexDirection="column" gap={1} onClick={onClick}>
      {purchase.paymentMethodGroup === PaymentMethodGroup.CreditCard && (
        <Installment
          installment={purchase.paymentAdditionalData?.installments}
          total={purchase.total}
        />
      )}
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="subtitle1">
              {getLabel(purchase.paymentMethodGroup!)}
            </Typography>
          </Box>
          {getIcon(purchase.paymentMethodGroup!)}
        </Box>
      </CardContent>
    </Box>
  )
}

export default PaymentResume
