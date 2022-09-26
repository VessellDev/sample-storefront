import { Box, Button } from '@mui/material'
import { mockInstallments } from 'mock'
import { FC } from 'react'
import Installment from '../installment'
import { StepFormProps } from '../step'

const InstallmentForm: FC<StepFormProps> = ({ onGoBack, onSuccess }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    {mockInstallments.map(({ installment, price }) => (
      <Installment
        key={installment}
        {...{ installment, price }}
        onClick={onSuccess}
      />
    ))}
    <Box display="flex" justifyContent="flex-end">
      <Button variant="text" color="secondary" onClick={onGoBack}>
        VOLTAR
      </Button>
    </Box>
  </Box>
)

export default InstallmentForm
