import { Box } from '@mui/material'
import { GraphQLTypes } from '@vessell/sdk/lib/zeus'
import Cart from 'components/cart/cart'
import Categories from 'components/categories'
import Logo from 'components/logo'
import Selection from 'components/selection'
import Slideshow from 'components/slideshow'
import UserStatus from 'components/userStatus'
import { GetServerSideProps, NextPage } from 'next'
import SDK from 'sdk'
import styles from './index.module.css'

interface HomeProps {
  products: GraphQLTypes['ProductSearchResult']['items']['nodes']
  categories: GraphQLTypes['ProductCategory'][]
}

const Home: NextPage<HomeProps> = ({ products, categories }) => {
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={112}
        p={4}
      >
        <Logo />
        <Box display="flex" alignItems="center" gap={1}>
          <UserStatus />
          <Cart />
        </Box>
      </Box>
      <Slideshow />
      <Categories categories={categories} />
      <section className={styles.selections}>
        <Selection
          className={styles.selection}
          title="Mais Baratos"
          products={products}
        />
        <Selection
          className={styles.selection}
          title="Novidades"
          products={products}
        />
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const products = await SDK.productSearch([
    {
      paging: { limit: 4 },
    },
    {
      items: {
        nodes: {
          id: true,
          name: true,
          slug: true,
          mainImage: { asset: { url: true } },
          price: { minPrice: true },
        },
      },
    },
  ])

  const categories = await SDK.productCategories([
    {},
    {
      nodes: {
        id: true,
        name: true,
        slug: true,
      },
    },
  ])

  return {
    props: {
      products: products.items.nodes,
      categories: categories.nodes,
    },
  }
}

export default Home
