import { FC } from 'react'
import { Typography } from '@mui/material'
import styles from './price.module.css'

interface PriceProps {
  value: number
}

const Price: FC<PriceProps> = ({ value }) => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className={styles.price}>
      <Typography variant="h2" component="span">
        {intl.format(value)}
      </Typography>
    </div>
  )
}

export default Price
