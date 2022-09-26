import { CreditCard } from '@mui/icons-material'
import { Box, CardContent, Typography } from '@mui/material'
import { mockInstallments } from 'mock'
import { FC } from 'react'
import Installment from '../installment'
import { StepResumeProps } from '../step'

const PaymentResume: FC<StepResumeProps> = ({ onClick }) => (
  <Box display="flex" flexDirection="column" gap={1} onClick={onClick}>
    <Installment {...mockInstallments[0]} />
    <CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr={2}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">**** **** **** 1234</Typography>
          <Typography variant="h4" color="secondary">
            JOHN DOE DA SILVA
          </Typography>
        </Box>
        <CreditCard />
      </Box>
    </CardContent>
  </Box>
)

export default PaymentResume
