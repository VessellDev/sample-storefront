import { Typography } from "@material-ui/core"
import { FC } from "react"
import { ProductType } from "types/product"
import styles from "./product.module.css"
import Link from "next/link"
import { useProjectCode } from "hooks/projectCode"

export interface ProductProps {
  id: string
  name: string
  slug: string
  mainImage?: {
    asset: {
      url: string
    }
  }
  price?: {
    minPrice: number
  }
}

const Product: FC<ProductProps> = ({ id, slug, mainImage, name, price }) => {
  const { getLinkWithQuery } = useProjectCode()

  return (
    <Link
      // href={`/produtos/${slug}`}
      href={getLinkWithQuery(`/produtos/${id}`)}
    >
      <div className={styles.product}>
        <div
          style={{ backgroundImage: `url(${mainImage?.asset.url})` }}
          className={styles.image}
        />
        <div className={styles.content}>
          <Typography variant="h4" color="secondary">
            {name}
          </Typography>
          <Typography variant="subtitle1">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price ? price.minPrice : 0)}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export default Product
