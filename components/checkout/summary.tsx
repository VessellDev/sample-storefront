import { Box, LinearProgress } from '@mui/material'
import { FC } from 'react'
import Item from './item'
import Price from './price'

interface SummaryProps {
  purchase: {
    id: string
    items: {
      id: string
      inventoryItem: {
        product: {
          mainImage?: { asset: { url: string } }
          name: string
        }
        price: number
      }
    }[]
    total: number
  }
}

const Summary: FC<SummaryProps> = ({ purchase }) => (
  <Box position="sticky" top={32} display="flex" flexDirection="column" gap={2}>
    {purchase.items.map(({ id, inventoryItem }) => (
      <Item key={id} {...inventoryItem} />
    ))}
    <Price value={purchase.total} />
  </Box>
)

export default Summary
