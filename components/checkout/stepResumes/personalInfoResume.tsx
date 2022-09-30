import { Box, CardContent, LinearProgress, Typography } from '@mui/material'
import { FC } from 'react'
import { StepResumeProps } from '../step'

const PersonalInfoResume: FC<StepResumeProps> = ({ onClick, customer }) => (
  <CardContent onClick={onClick}>
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography variant="subtitle1">NOME</Typography>
        <Typography variant="h4" color="secondary">
          {customer.name}
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Box width="100%">
          <Typography variant="subtitle1">CPF</Typography>
          <Typography variant="h4" color="secondary">
            {customer.identificationNumber}
          </Typography>
        </Box>
        <Box width="100%">
          <Typography variant="subtitle1">CELULAR</Typography>
          <Typography variant="h4" color="secondary">
            {customer.phoneNumber}
          </Typography>
        </Box>
      </Box>
    </Box>
  </CardContent>
)

export default PersonalInfoResume
