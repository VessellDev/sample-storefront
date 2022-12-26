import { Box, LinearProgress } from '@mui/material'
import { mockInstallments } from 'mock'
import { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import SDK from 'sdk'
import Installment from '../installment'
import PaymentMethod from '../paymentMethod'
import { StepFormProps } from '../step'
import InstallmentForm from './paymentForm/installmentForm'
import BilletForm from './paymentForm/billetForm'
import CardForm from './paymentForm/cardForm'
import PixForm from './paymentForm/pixForm'
import { usePaymentLabel } from 'hooks/usePaymentMethodLabel'

const PaymentForm: FC<StepFormProps> = ({
  onSuccess,
  purchase,
  setLoading,
}) => {
  const [paymentMethodIndex, setPaymentMethodIndex] = useState<number>()
  const [installments, setInstallments] = useState<number>()
  const { getLabel } = usePaymentLabel()

  const { data } = useQuery(['payment-methods'], () =>
    SDK.request('query')({
      paymentMethods: {
        code: true,
        group: true,
        isActive: true,
      },
    }),
  )

  const paymentMethods = useMemo(
    () => data?.paymentMethods.filter((method) => method.isActive),
    [data],
  )

  const paymentMethod = useMemo(
    () =>
      paymentMethodIndex !== undefined && paymentMethods
        ? paymentMethods[paymentMethodIndex]
        : undefined,
    [paymentMethodIndex, paymentMethods],
  )

  if (paymentMethod?.group === 'CreditCard') {
    if (installments === undefined) {
      return (
        <InstallmentForm
          onSuccess={setInstallments}
          onGoBack={() => setPaymentMethodIndex(undefined)}
          purchase={purchase}
          setLoading={setLoading}
        />
      )
    }

    return (
      <Box display="flex" flexDirection="column" gap={3}>
        <Installment
          installment={installments}
          total={purchase.total}
          onClick={() => setInstallments(undefined)}
        />
        <CardForm
          code={paymentMethod.code}
          installments={installments}
          onGoBack={() => setInstallments(undefined)}
          onSuccess={onSuccess}
          purchase={purchase}
          setLoading={setLoading}
        />
      </Box>
    )
  }

  if (paymentMethod?.group === 'Pix') {
    return (
      <PixForm
        code={paymentMethod.code}
        onGoBack={() => setPaymentMethodIndex(undefined)}
        onSuccess={onSuccess}
        purchase={purchase}
        setLoading={setLoading}
      />
    )
  }

  if (paymentMethod?.group === 'Boleto') {
    return (
      <BilletForm
        code={paymentMethod.code}
        onGoBack={() => setPaymentMethodIndex(undefined)}
        onSuccess={onSuccess}
        purchase={purchase}
        setLoading={setLoading}
      />
    )
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {!paymentMethods && <LinearProgress />}
      {paymentMethods?.map((method, i) => (
        <PaymentMethod key={i} onClick={() => setPaymentMethodIndex(i)}>
          {getLabel(method.group)}
        </PaymentMethod>
      ))}
    </Box>
  )
}

export default PaymentForm
