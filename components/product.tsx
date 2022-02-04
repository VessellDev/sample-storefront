import { Typography } from '@material-ui/core'
import { FC } from 'react'
import { ProductType } from 'types/product'
import styles from './product.module.css'
import Link from 'next/link'

export interface ProductProps extends ProductType {}

const Product: FC<ProductProps> = ({ slug, image, name, price }) => (
  <Link href={`/produtos/${slug}`}>
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
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
        </Typography>
      </div>
    </div>
  </Link>
)

export default Product
