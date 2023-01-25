import { FC } from 'react'
import { Box, CardContent, Typography } from '@mui/material'

interface InstallmentProps {
  installment: number
  total: number
  onClick?: () => void
}

const Installment: FC<InstallmentProps> = ({ installment, total, onClick }) => (
  <CardContent
    onClick={onClick}
    sx={{
      cursor: onClick && 'pointer',
      transition: 'all 0.2s ease-in-out',
      '&:hover': onClick && {
        transform: 'translateX(8px)',
      },
    }}
  >
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
          }).format(total / installment)}
        </Typography>
        <Typography variant="h4" color="secondary" component="span">
          sem juros
        </Typography>
      </Box>
    </Box>
  </CardContent>
)

export default Installment
