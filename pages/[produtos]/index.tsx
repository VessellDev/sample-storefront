import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import styles from "./produtos.module.css"
import Product from "components/product"
import Filters from "components/filters"
import Logo from "components/logo"
import Cart from "components/cart/cart"
import Breadcrumbs from "components/breadcrumbs"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { useLocomotiveScroll } from "react-locomotive-scroll"
import SDK from "sdk"
import { GraphQLTypes } from "@vessell/sdk/lib/zeus"

interface ProductsProps {
  products: GraphQLTypes["ProductSearchResult"]["items"]["nodes"]
  category: GraphQLTypes["ProductCategory"]
}

const Products: NextPage<ProductsProps> = ({ products, category }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on("scroll", (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id="container">
      <header
        data-scroll
        data-scroll-sticky
        data-scroll-target="#container"
        className={styles.header}
      >
        <div
          className={classNames(styles.container, {
            [styles.scrolling]: scrolling,
          })}
        >
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const slug = ctx.query.produtos as string

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
