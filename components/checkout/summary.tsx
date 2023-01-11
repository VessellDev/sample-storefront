import { Check } from '@mui/icons-material'
import { Box, Chip, LinearProgress } from '@mui/material'
import {
  PaymentMethodGroup,
  ShippingClassification,
} from '@vessell/sdk/dist/cjs/zeus'
import { FC } from 'react'
import Item from './item'
import Price from './price'

type Purchase = {
  id: string
  paymentMethodGroup?: PaymentMethodGroup
  shippingClassification?: ShippingClassification
  shippingPrice?: number
  maxDeliveryTime?: number
  minDeliveryTime?: number
  address?: {
    id: string
    postalCode: string
    city: string
    state: string
    street: string
    neighborhood: string
    number: string
    complement?: string
  }
  customer?: {
    name?: string
    identificationNumber?: string
    phoneNumber?: string
  }
  items: {
    id: string
    quantity: number
    inventoryItem: {
      id: string
      product: {
        mainImage?: { asset: { url: string } }
        name: string
      }
      price: number
    }
  }[]
  total: number
}

interface SummaryProps {
  purchase: Purchase
}

const Summary: FC<SummaryProps> = ({ purchase }) => (
  <Box position="sticky" top={32} display="flex" flexDirection="column" gap={2}>
    {purchase.items.map(({ id, inventoryItem }) => (
      <Item key={id} {...inventoryItem} />
    ))}
    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
      {purchase.shippingClassification && (
        <Chip color="primary" icon={<Check />} label="Com Frete" />
      )}
      <Price value={purchase.total} />
    </Box>
  </Box>
)

export default Summary
