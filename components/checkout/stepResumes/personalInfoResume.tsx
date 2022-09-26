import { Box, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import { StepResumeProps } from '../step'

const PersonalInfoResume: FC<StepResumeProps> = ({ onClick }) => (
  <CardContent onClick={onClick}>
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Typography variant="subtitle1">johndoe@gmail.com</Typography>
        <Typography variant="h4" color="secondary">
          John Doe da Silva
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Box width="100%">
          <Typography variant="subtitle1">CPF</Typography>
          <Typography variant="h4" color="secondary">
            070.410.609-42
          </Typography>
        </Box>
        <Box width="100%">
          <Typography variant="subtitle1">Celular</Typography>
          <Typography variant="h4" color="secondary">
            (46) 9 8404-4713
          </Typography>
        </Box>
      </Box>
    </Box>
  </CardContent>
)

export default PersonalInfoResume
