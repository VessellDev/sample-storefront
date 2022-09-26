import { Box, Button, Typography } from '@mui/material'
import { StepFormProps } from 'components/checkout/step'
import { FC } from 'react'

const BilletForm: FC<StepFormProps> = ({ onGoBack }) => (
  <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
    <Typography>Método não implementado</Typography>
    <Button variant="text" color="secondary" onClick={onGoBack}>
      VOLTAR
    </Button>
  </Box>
)

export default BilletForm
