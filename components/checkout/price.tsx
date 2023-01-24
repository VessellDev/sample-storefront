import { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface PriceProps {
  value: number
}

const Price: FC<PriceProps> = ({ value }) => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Box textAlign="right">
      <Typography variant="h2" component="span">
        {intl.format(value)}
      </Typography>
    </Box>
  )
}

export default Price
