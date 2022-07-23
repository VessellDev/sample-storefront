import Cart from "components/cart/cart";
import Highlight from "components/highlight";
import Logo from "components/logo";
import Selection from "components/selection";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import styles from "./index.module.css";
import { mockProducts, mockCategories } from "mock";
import classnames from "classnames";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { useEffect, useState } from "react";
import SDK from "sdk";
import { GraphQLTypes } from "@vessell/sdk/lib/zeus";

interface HomeProps {
  products: GraphQLTypes["ProductSearchResult"]["items"]["nodes"];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  const { scroll } = useLocomotiveScroll();
  const [scrollY, setScrollY] = useState(0);
  const scrolling = scrollY > 0;

  useEffect(() => {
    scroll?.on("scroll", (args: any) => {
      args.delta && setScrollY(args.delta.y);
    });
  }, [scroll]);

  return (
    <div data-scroll-section id="container">
      {/* <section className={styles.highlights}>
        <Highlight className={styles.one} href={mockCategories[0].slug}>
          Xiaomi MI 11 a partir <br/> de R$ 2573,00
        </Highlight>
        <Highlight className={styles.two} href={mockCategories[1].slug}>
          iPhone XR 64gb a partir <br/> de R$ 3921,00
        </Highlight>
        <Highlight className={styles.three} href={mockCategories[2].slug}>
          Motorola Z4 a partir <br/> de R$ 1932,00
        </Highlight>
        <Highlight className={styles.four} href={mockCategories[3].slug}>
          Galaxy J6 a partir <br/> de R$ 2963,00
        </Highlight>
      </section> */}
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
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const result = await SDK.productSearch([
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
  ]);

  return {
    props: {
      products: result.items.nodes,
    },
  };
};

export default Home;
