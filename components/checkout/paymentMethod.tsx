import { Box, CardContent, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

interface PaymentMethodProps {
  onClick: () => void
}

const PaymentMethod: FC<PropsWithChildren<PaymentMethodProps>> = ({
  children,
  onClick,
}) => (
  <CardContent
    onClick={onClick}
    sx={{
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateX(8px)',
      },
    }}
  >
    <Typography variant="subtitle1" component="span">
      {children}
    </Typography>
  </CardContent>
)

export default PaymentMethod
