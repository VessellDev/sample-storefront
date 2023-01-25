import { Box, Chip, Typography } from '@mui/material'
import { OrderItemStatus } from '@vessell/sdk/dist/cjs/zeus'
import { FC } from 'react'
import { useOrderStatusLabel } from 'hooks/useOrderStatusLabel'

interface ItemProps {
  product: {
    mainImage?: { asset: { url: string } }
    name: string
  }
  price: number
  quantity: number
  status?: OrderItemStatus
}

const Item: FC<ItemProps> = ({ product, price, quantity, status }) => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const { getLabel } = useOrderStatusLabel()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pr={5}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          width={156}
          height={128}
          sx={{
            backgroundImage: `url(${product.mainImage?.asset.url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box pb={1}>
            {status && <Chip size="small" label={getLabel(status)} />}
          </Box>
          <Typography color="secondary">{product.name}</Typography>
          <Typography variant="subtitle1">{intl.format(price)}</Typography>
        </Box>
      </Box>
      <Typography color="secondary">{quantity}un</Typography>
    </Box>
  )
}

export default Item
