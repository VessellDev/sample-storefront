import { Box, Button, TextField } from '@mui/material'
import { StepFormProps } from 'components/checkout/step'
import { FC } from 'react'

const CardForm: FC<StepFormProps> = ({ onGoBack, onSuccess }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <TextField label="Nome" />
    <TextField label="Número" />
    <Box display="flex" width="100%" gap={1}>
      <TextField sx={{ flex: 0.7 }} label="Validade" />
      <TextField sx={{ flex: 0.3 }} label="CVC" />
    </Box>
    <Box display="flex" justifyContent="flex-end" gap={1}>
      <Button variant="text" color="secondary" onClick={onGoBack}>
        VOLTAR
      </Button>
      <Button variant="text" onClick={onSuccess}>
        CONTINUAR
      </Button>
    </Box>
  </Box>
)

export default CardForm
