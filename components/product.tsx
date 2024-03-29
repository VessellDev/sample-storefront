import { Typography } from '@mui/material'
import { FC } from 'react'
import styles from './product.module.css'
import Link from 'next/link'

export interface ProductProps {
  id: string
  name: string
  slug: string
  mainImage?: {
    asset: {
      url: string
    }
  }
  childProducts?: {
    mainImage?: {
      asset: {
        url: string
      }
    }
    slug: string
  }[]
  price?: {
    minPrice: number
  }
}

const Product: FC<ProductProps> = ({
  id,
  slug,
  mainImage,
  name,
  price,
  childProducts,
}) => (
  <Link
    href={`/produtos/${
      childProducts && childProducts[0] ? childProducts[0].slug : slug
    }`}
    passHref
  >
    <div className={styles.product}>
      <div
        style={{
          backgroundImage: `url(${
            childProducts && childProducts[0]
              ? childProducts[0].mainImage?.asset.url
              : mainImage?.asset.url
          })`,
        }}
        className={styles.image}
      />
      <div className={styles.content}>
        <Typography variant="h4" color="secondary">
          {name}
        </Typography>
        <Typography variant="subtitle1">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price ? price.minPrice : 0)}
        </Typography>
      </div>
    </div>
  </Link>
)

export default Product
