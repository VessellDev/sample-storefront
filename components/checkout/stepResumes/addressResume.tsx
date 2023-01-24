import { Box, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { StepResumeProps } from '../step'

const AddressResume: FC<StepResumeProps> = ({ onClick, purchase }) => (
  <CardContent onClick={onClick}>
    <Box>
      <Typography variant="subtitle1">
        {purchase.address?.postalCode}
      </Typography>
      <Typography variant="h4" color="secondary">
        {purchase.address?.city} - {purchase.address?.state}.{' '}
        {purchase.address?.neighborhood}. {purchase.address?.street},{' '}
        {purchase.address?.number}. {purchase.address?.complement}
        {purchase.address?.complement
          ? ` ${purchase.address?.complement}.`
          : ''}
      </Typography>
    </Box>
  </CardContent>
)

export default AddressResume
