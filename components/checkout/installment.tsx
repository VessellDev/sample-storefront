import { FC } from 'react'
import { Box, CardContent, Typography } from '@mui/material'

interface InstallmentProps {
  installment: number
  price: number
  onClick?: () => void
}

const Installment: FC<InstallmentProps> = ({ installment, price, onClick }) => (
  <CardContent onClick={onClick} sx={{ cursor: 'pointer' }}>
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="subtitle1" component="span">
          {installment}x
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="subtitle1" component="span">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price)}
        </Typography>
        <Typography variant="h4" color="secondary" component="span">
          sem juros
        </Typography>
      </Box>
    </Box>
  </CardContent>
)

export default Installment
