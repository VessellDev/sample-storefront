import { Box, Button } from '@mui/material'
import { mockInstallments } from 'mock'
import { FC, useState } from 'react'
import Installment from '../installment'
import PaymentOption from '../paymentOption'
import { StepFormProps } from '../step'
import InstallmentForm from './installmentForm'
import BilletForm from './paymentForm/billetForm'
import CardForm from './paymentForm/cardForm'
import PixForm from './paymentForm/pixForm'

const OPTIONS = ['Cartão de Crédito', 'Cartão de Débito', 'Pix', 'Boleto']

const PaymentForm: FC<StepFormProps> = ({ onSuccess }) => {
  const [paymentOption, setPaymentOption] = useState<number>()
  const [installments, setInstallments] = useState<number>()

  if (paymentOption === 0 || paymentOption === 1) {
    if (installments === undefined) {
      return (
        <InstallmentForm
          onSuccess={() => setInstallments(0)}
          onGoBack={() => setPaymentOption(undefined)}
        />
      )
    }

    return (
      <Box display="flex" flexDirection="column" gap={3}>
        <Installment
          {...mockInstallments[installments]}
          onClick={() => setInstallments(undefined)}
        />
        <CardForm
          onGoBack={() => setInstallments(undefined)}
          onSuccess={onSuccess}
        />
      </Box>
    )
  }

  if (paymentOption === 2) {
    return (
      <PixForm
        onGoBack={() => setPaymentOption(undefined)}
        onSuccess={onSuccess}
      />
    )
  }

  if (paymentOption === 3) {
    return (
      <BilletForm
        onGoBack={() => setPaymentOption(undefined)}
        onSuccess={onSuccess}
      />
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {OPTIONS.map((option, i) => (
        <PaymentOption key={i} onClick={() => setPaymentOption(i)}>
          {option}
        </PaymentOption>
      ))}
    </Box>
  )
}

export default PaymentForm
