import { Box } from '@mui/material'
import ShippingOption from '../shippingOption'
import { mockShippingOptions } from 'mock'
import { FC } from 'react'
import { StepFormProps } from '../step'

const ShippingForm: FC<StepFormProps> = ({ onSuccess }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    {mockShippingOptions.map((option) => (
      <ShippingOption key={option.type} {...option} onClick={onSuccess} />
    ))}
  </Box>
)

export default ShippingForm
