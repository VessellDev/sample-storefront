import { GraphQLTypes } from "@vessell/sdk/lib/zeus"
import classnames from "classnames"
import Cart from "components/cart/cart"
import Categories from "components/categories"
import Logo from "components/logo"
import Selection from "components/selection"
import Slideshow from "components/slideshow"
import { NextPage } from "next"
import { getServerSidePropsWithSDK } from "props-with-sdk"
import { useEffect, useState } from "react"
import { useLocomotiveScroll } from "react-locomotive-scroll"
import styles from "./index.module.css"

interface HomeProps {
  products: GraphQLTypes["ProductSearchResult"]["items"]["nodes"]
  categories: GraphQLTypes["ProductCategory"][]
}

const Home: NextPage<HomeProps> = ({ products, categories }) => {
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on("scroll", (args: any) => {
      args.delta && setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div data-scroll-section id="container">
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
      <header
        data-scroll
        data-scroll-sticky
        data-scroll-target="#container"
        className={classnames(styles.header, { [styles.scrolling]: scrolling })}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <Logo />
            <Cart />
          </div>
        </div>
      </header>
    </div>
  )
}

export const getServerSideProps = getServerSidePropsWithSDK((SDK) => async () => {
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
})

export default Home
