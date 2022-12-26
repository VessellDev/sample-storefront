import { Box, Button } from '@mui/material'
import { mockInstallments } from 'mock'
import { FC } from 'react'
import Installment from '../../installment'
import { StepFormProps } from '../../step'

const InstallmentForm: FC<StepFormProps> = ({
  onGoBack,
  onSuccess,
  purchase,
}) => (
  <Box display="flex" flexDirection="column" gap={1}>
    {new Array(6).fill(null).map((_, i) => (
      <Installment
        key={i}
        installment={i + 1}
        total={purchase.total}
        onClick={() => onSuccess(i + 1)}
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
