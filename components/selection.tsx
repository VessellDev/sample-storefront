import { Typography } from '@mui/material'
import { FC } from 'react'
import Product, { ProductProps } from './product'
import styles from './selection.module.css'

interface SelectionProps {
  title: string
  className?: string
  products: ProductProps[]
}

const Selection: FC<SelectionProps> = ({ title, className, products }) => (
  <div className={className}>
    <Typography className={styles.title} variant="h2">
      {title}
    </Typography>
    <div className={styles.list}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  </div>
)

export default Selection
