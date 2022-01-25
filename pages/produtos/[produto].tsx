import classnames from 'classnames'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart'
import Logo from 'components/logo'
import { mockFullProduct } from 'mock'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import { FullProductType } from 'types/fullProduct'
import styles from './produto.module.css'
import Slideshow from 'components/productPage/slideshow'
import Properties from 'components/productPage/properties'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const product = mockFullProduct

  return {
    props: { product }
  }
}

interface ProductProps {
  product: FullProductType
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id='container' className={styles.wrapper}>
      <header
        data-scroll data-scroll-sticky data-scroll-target='#container'
        className={styles.header}
      >
        <div className={classnames(styles.container, { [styles.scrolling]: scrolling })}>
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs
              crumbs={[
                { href: `/${product.category.slug}`, label: product.category.label },
                { href: product.slug, label: product.name }
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
          <Slideshow image={product.image} />
        </div>
        <div className={styles.right}>
          <Properties {...product} />
        </div>
      </div>
    </div>
  )
}

export default Product
