import {
  $,
  GraphQLTypes,
  InputType,
  Selector,
} from '@vessell/sdk/dist/cjs/zeus'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart/cart'
import Logo from 'components/logo'
import Product from 'components/product'
import { GetServerSideProps, NextPage } from 'next'
import SDK from 'sdk'
import styles from './produtos.module.css'

const selector = Selector('Query')({
  productSearch: [
    {
      filter: { categorySlug: $('slug', 'String') },
    },
    {
      items: {
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
        children: {
          mainImage: { asset: { url: true } },
          slug: true,
        },
      },
    },
  ],
  productCategories: [
    {
      filters: [{ slug: { eq: $('slug', 'String') } }],
    },
    {
      items: {
        name: true,
        slug: true,
      },
    },
  ],
})

interface ProductsProps {
  products: InputType<
    GraphQLTypes['Query'],
    typeof selector
  >['productSearch']['items']
  category: InputType<
    GraphQLTypes['Query'],
    typeof selector
  >['productCategories']['items'][0]
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

  const { productSearch, productCategories } = await SDK.request('query')(
    selector,
    {
      variables: { slug },
    },
  )

  return {
    props: {
      products: productSearch.items,
      category: productCategories.items[0],
    },
  }
}

export default Products
