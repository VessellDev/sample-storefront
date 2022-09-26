import { Box, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { StepResumeProps } from '../step'

const AddressResume: FC<StepResumeProps> = ({ onClick }) => (
  <CardContent onClick={onClick}>
    <Box>
      <Typography variant="subtitle1">85.601-610</Typography>
      <Typography variant="h4" color="secondary">
        Francisco Beltrão - PR. Centro. Rua Tenente Camargo, 1777. Sala 73.
      </Typography>
    </Box>
  </CardContent>
)

export default AddressResume
