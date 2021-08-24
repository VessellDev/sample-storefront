import { Typography } from '@material-ui/core'
import { FC } from 'react'
import { ProductType } from 'types/product'
import styles from './product.module.css'

export interface ProductProps extends ProductType {}

const Product: FC<ProductProps> = ({ image, name, price }) => (
  <div className={styles.product}>
    <div
      style={{ backgroundImage: `url(${image})` }}
      className={styles.image}
    />
    <div className={styles.content}>
      <Typography variant='h4' color='secondary'>
        {name}
      </Typography>
      <Typography variant='subtitle1'>
        R$ {price.toFixed(2)}
      </Typography>
    </div>
  </div>
)

export default Product
