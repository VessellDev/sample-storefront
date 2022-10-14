import { GraphQLTypes } from '@vessell/sdk/lib/zeus'
import classnames from 'classnames'
import Breadcrumbs from 'components/breadcrumbs'
import Cart from 'components/cart/cart'
import Logo from 'components/logo'
import Properties from 'components/productPage/properties'
import Slideshow from 'components/productPage/slideshow'
import { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSidePropsWithSDK } from 'props-with-sdk'
import { useEffect, useState } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import styles from './produto.module.css'

interface ProductProps {
  product: GraphQLTypes['Product']
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0
  const [category] = product.categories

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id="container" className={styles.wrapper}>
      <header
        data-scroll
        data-scroll-sticky
        data-scroll-target="#container"
        className={styles.header}
      >
        <div
          className={classnames(styles.container, {
            [styles.scrolling]: scrolling,
          })}
        >
          <div className={styles.left}>
            <Logo />
            <Breadcrumbs
              crumbs={
                category
                  ? [
                      { href: `/${category.slug}`, label: category.name },
                      { href: product.slug, label: product.name },
                    ]
                  : [{ href: product.slug, label: product.name }]
              }
            />
          </div>
          <div className={styles.right}>
            <Cart />
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.left}>
          {product.mainImage && (
            <Slideshow image={product.mainImage.asset.url} />
          )}
        </div>
        <div className={styles.right}>
          <Properties {...product} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = getServerSidePropsWithSDK<ProductProps>(
  (SDK) => async (context) => {
    const product = await SDK.product([
      {
        id: context.query.produto as string,
      },
      {
        id: true,
        slug: true,
        name: true,
        mainImage: {
          asset: {
            url: true,
          },
        },
        price: {
          minPrice: true,
        },
        shortDescription: true,
        categories: [
          {},
          {
            id: true,
            slug: true,
          },
        ],
      },
    ])

    if (!product) {
      return { notFound: true }
    }

    return {
      props: {
        product,
      },
    }
  },
)

export default Product
