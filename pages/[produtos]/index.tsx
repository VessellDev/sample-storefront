import { GraphQLTypes } from '@vessell/sdk/lib/zeus'
import classNames from 'classnames'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart/cart'
import Logo from 'components/logo'
import Product from 'components/product'
import { GetServerSideProps, NextPage } from 'next'
import SDK from 'sdk'
import styles from './produtos.module.css'

interface ProductsProps {
  products: GraphQLTypes['ProductSearchResult']['items']['nodes']
  category: GraphQLTypes['ProductCategory']
}

const Products: NextPage<ProductsProps> = ({ products, category }) => {
  return (
    <div data-scroll-section id="container">
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs
              crumbs={[{ label: category.name, href: category.slug }]}
            />
          </div>
          <div className={styles.right}>
            {/* <Filters /> */}
            <Cart />
          </div>
        </div>
      </header>
      <section className={styles.grid}>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (
  context,
) => {
  const slug = context.query.produtos as string

  const products = await SDK.productSearch([
    {
      filter: {
        categorySlug: slug,
      },
    },
    {
      items: {
        nodes: {
          id: true,
          name: true,
          slug: true,
          mainImage: {
            asset: {
              url: true,
            },
          },
          price: {
            minPrice: true,
          },
        },
      },
    },
  ])

  const categories = await SDK.productCategories([
    {
      filter: {
        slug: {
          eq: slug,
        },
      },
    },
    {
      nodes: {
        name: true,
        slug: true,
      },
    },
  ])

  return {
    props: {
      products: products.items.nodes,
      category: categories.nodes[0],
    },
  }
}

export default Products
