import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import styles from './produtos.module.css'
import { mockCategories, mockProducts } from 'mock'
import Product from 'components/product'
import Filters from 'components/filters'
import Logo from 'components/logo'
import Cart from 'components/cart'
import Breadcrumbs from 'components/breadcrumbs'
import { CategoryType } from 'types/category'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const category = mockCategories.find(category => (
    category.slug === ctx.query.produtos
  ))

  if (!category) return { notFound: true }

  return {
    props: { category }
  }
}

interface ProductsProps {
  category: CategoryType
}

const Products: NextPage<ProductsProps> = ({ category }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id='container'>
      <header
        data-scroll data-scroll-sticky data-scroll-target='#container'
        className={styles.header}
      >
        <div className={classNames(styles.container, { [styles.scrolling]: scrolling })}>
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs crumbs={[{ label: category.label, href: category.slug }]} />
          </div>
          <div className={styles.right}>
            <Filters />
            <Cart />
          </div>
        </div>
      </header>
      <section className={styles.grid}>
        {mockProducts.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </section>
    </div>
  )
}

export default Products
