import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'
import { StepFormProps } from '../step'

const AddressForm: FC<StepFormProps> = ({ onSuccess }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <TextField label="CEP" />
    <Box width="100%" display="flex" alignItems="center" gap={1}>
      <TextField label="Cidade" sx={{ flex: 0.7 }} />
      <TextField label="UF" sx={{ flex: 0.3 }} />
    </Box>
    <TextField label="Bairro" />
    <Box width="100%" display="flex" alignItems="center" gap={1}>
      <TextField label="Rua" sx={{ flex: 0.7 }} />
      <TextField label="Número" sx={{ flex: 0.3 }} />
    </Box>
    <TextField label="Complemento" />
    <Box display="flex" justifyContent="flex-end">
      <Button variant="text" onClick={onSuccess}>
        CONTINUAR
      </Button>
    </Box>
  </Box>
)

export default AddressForm
