import { GraphQLTypes } from '@vessell/sdk/lib/zeus'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart/cart'
import Logo from 'components/logo'
import Properties from 'components/productPage/properties'
import Slideshow from 'components/productPage/slideshow'
import { GetServerSideProps, NextPage } from 'next'
import SDK from 'sdk'
import styles from './produto.module.css'

interface ProductProps {
  product: GraphQLTypes['Product']
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const category = product.categories[0]

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs
              crumbs={[
                category && { href: `/${category.slug}`, label: category.name },
                { href: product.slug, label: product.name },
              ]}
            />
          </div>
          <div className={styles.right}>
            <Cart />
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.left}>
          <Slideshow image={product.mainImage?.asset.url} />
        </div>
        <div className={styles.right}>
          <Properties {...product} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async ({
  query: { produto },
}) => {
  const product = await SDK.product([
    { slug: produto as string },
    {
      id: true,
      slug: true,
      name: true,
      mainImage: { asset: { url: true } },
      shortDescription: true,
      inventoryItems: [{}, { id: true, price: true }],
      categories: [{}, { id: true, name: true, slug: true }],
    },
  ])

  if (!product) return { notFound: true }
  return { props: { product } }
}

export default Product
