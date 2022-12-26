import { PaymentMethodGroup } from '@vessell/sdk/dist/cjs/zeus'
import {
  ArticleOutlined,
  CreditCardOffOutlined,
  PaymentsOutlined,
  PixOutlined,
} from '@mui/icons-material'

const LABELS = {
  [PaymentMethodGroup.Boleto]: {
    label: 'Boleto',
    Icon: ArticleOutlined,
  },
  [PaymentMethodGroup.Pix]: {
    label: 'Pix',
    Icon: PixOutlined,
  },
  [PaymentMethodGroup.CreditCard]: {
    label: 'Cartão de Crédito',
    Icon: CreditCardOffOutlined,
  },
  [PaymentMethodGroup.Other]: {
    label: 'Outros',
    Icon: PaymentsOutlined,
  },
}

export const usePaymentLabel = () => {
  const getLabel = (classification: PaymentMethodGroup) =>
    LABELS[classification].label

  const getIcon = (classification: PaymentMethodGroup) => {
    const { Icon } = LABELS[classification]
    return <Icon />
  }

  return { getLabel, getIcon }
}
