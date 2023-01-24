import { FC } from 'react'
import { ShippingOptionType } from 'types/shipping'
import moment from 'moment'
import { Box, CardContent, Typography } from '@mui/material'

interface ShippingOptionProps extends ShippingOptionType {
  onClick: () => void
}

const ShippingOption: FC<ShippingOptionProps> = ({
  label,
  price,
  delivery,
  onClick,
}) => (
  <CardContent onClick={onClick} sx={{ cursor: 'pointer' }}>
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="subtitle1" component="span">
          {label}
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
          entre {moment().add(delivery.min, 'days').format('DD/MM')} e{' '}
          {moment().add(delivery.max, 'days').format('DD/MM')}
        </Typography>
      </Box>
    </Box>
  </CardContent>
)

export default ShippingOption
