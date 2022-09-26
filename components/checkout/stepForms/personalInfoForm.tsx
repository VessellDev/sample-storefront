import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'
import { StepFormProps } from '../step'

const PersonalInfoForm: FC<StepFormProps> = ({ onSuccess }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <TextField label="E-mail" type="e-mail" />
    <TextField label="Nome" />
    <Box display="flex" alignItems="center" gap={1}>
      <TextField label="CPF" type="number" fullWidth />
      <TextField label="Celular" type="number" fullWidth />
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <Button variant="text" onClick={onSuccess}>
        CONTINUAR
      </Button>
    </Box>
  </Box>
)

export default PersonalInfoForm
