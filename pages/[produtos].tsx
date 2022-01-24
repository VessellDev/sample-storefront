import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import styles from './produtos.module.css'
import { mockCategories, mockProducts } from 'mock'
import Product from 'components/product'
import Filters from 'components/filters'
import Logo from 'components/logo'
import Cart from 'components/cart'
import Breadcrumbs from 'components/breadcrumbs'
import { CategoryType } from 'types/category'
import useScrollPosition from '@react-hook/window-scroll'
import classNames from 'classnames'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const category = mockCategories.find(category => (
    category.slug === ctx.query.produtos
  ))

  return {
    props: { category }
  }
}

interface ProductsProps {
  category: CategoryType
}

const Products: NextPage<ProductsProps> = ({ category }) => {
  const scrollY = useScrollPosition()

  return (
    <>
      <header className={classNames(styles.header, { [styles.scrolling]: scrollY > 0 })}>
        <div className={styles.left}>
          <Logo />
          <Breadcrumbs crumbs={[{ label: category.label, href: category.slug }]} />
        </div>
        <div className={styles.right}>
          <Filters />
          <Cart />
        </div>
      </header>
      <section className={styles.grid}>
        {mockProducts.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </section>
    </>
  )
}

export default Products
