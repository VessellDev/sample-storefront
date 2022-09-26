import { Box, CardContent, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

interface PaymentOptionProps {
  onClick: () => void
}

const PaymentOption: FC<PropsWithChildren<PaymentOptionProps>> = ({
  children,
  onClick,
}) => (
  <CardContent onClick={onClick} sx={{ cursor: 'pointer' }}>
    <Typography variant="subtitle1" component="span">
      {children}
    </Typography>
  </CardContent>
)

export default PaymentOption
