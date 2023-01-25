import { OrderItemStatus } from '@vessell/sdk/dist/cjs/zeus'

const LABELS = {
  [OrderItemStatus.AwaitingPayment]: 'Aguardando Pagamento',
  [OrderItemStatus.Canceled]: 'Cancelado',
  [OrderItemStatus.Paid]: 'Pago',
  [OrderItemStatus.Shipped]: 'Enviado',
}

export const useOrderStatusLabel = () => {
  const getLabel = (classification: OrderItemStatus) => LABELS[classification]

  return { getLabel }
}
