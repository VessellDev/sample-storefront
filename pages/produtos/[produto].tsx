import classnames from "classnames"
import Breadcrumbs from "components/breadcrumbs"
import Cart from "components/cart/cart"
import Logo from "components/logo"
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import { useEffect, useState } from "react"
import { useLocomotiveScroll } from "react-locomotive-scroll"
import styles from "./produto.module.css"
import Slideshow from "components/productPage/slideshow"
import Properties from "components/productPage/properties"
import SDK from "sdk"
import { GraphQLTypes } from "@vessell/sdk/lib/zeus"

interface ProductProps {
  product: GraphQLTypes["Product"]
  category: GraphQLTypes["ProductCategory"]
}

const Product: NextPage<ProductProps> = ({ product, category }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on("scroll", (args: any) => {
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
              crumbs={[
                {
                  href: `/${category.slug}`,
                  label: category.name,
                },
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const product = await SDK.product([
    {
      id: ctx.query.produto as string,
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
        },
      ],
    },
  ])

  const category = await SDK.productCategory([
    {
      id: product?.categories[0].id as string,
    },
    {
      name: true,
      slug: true,
    },
  ])

  return {
    props: {
      product,
      category,
    },
  }
}

export default Product
