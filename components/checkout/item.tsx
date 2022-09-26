import { Box, Card, Typography } from '@mui/material'
import { FC } from 'react'

interface ItemProps {
  image: string
  name: string
  price: number
}

const Item: FC<ItemProps> = ({ image, name, price }) => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <Card>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          width={156}
          height={128}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box display="flex" flexDirection="column">
          <Typography color="secondary">{name}</Typography>
          <Typography variant="subtitle1">{intl.format(price)}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default Item
