import Cart from 'components/cart'
import Highlight from 'components/highlight'
import Logo from 'components/logo'
import Selection from 'components/selection'
import { NextPage } from 'next'
import { ProductType } from 'types/product'
import styles from './index.module.css'

const products: ProductType[] = [
  {
    id: 1,
    image: '/images/image-1.png',
    name: 'iPhone XR 256GB Grafíte',
    price: 3412.00
  },
  {
    id: 2,
    image: '/images/image-2.png',
    name: 'iPhone XR 256GB Grafíte',
    price: 3412.00
  },
  {
    id: 3,
    image: '/images/image-3.png',
    name: 'iPhone XR 256GB Grafíte',
    price: 3412.00
  },
  {
    id: 4,
    image: '/images/image-1.png',
    name: 'iPhone XR 256GB Grafíte',
    price: 3412.00
  },
]

const Home: NextPage = () => (
  <>
    <section className={styles.highlights}>
      <Highlight className={styles.one} href="/produtos">
        Xiaomi MI 11 a partir <br/> de R$ 2573,00
      </Highlight>
      <Highlight className={styles.two} href="/produtos">
        iPhone XR 64gb a partir <br/> de R$ 3921,00
      </Highlight>
      <Highlight className={styles.three} href="/produtos">
        Motorola Z4 a partir <br/> de R$ 1932,00
      </Highlight>
      <Highlight className={styles.four} href="/produtos">
        Galaxy J6 a partir <br/> de R$ 2963,00
      </Highlight>
    </section>
    <section className={styles.selections}>
      <Selection
        className={styles.selection}
        title='Mais Baratos'
        products={products}
      />
      <Selection
        className={styles.selection}
        title='Novidades'
        products={products}
      />
    </section>
    <header className={styles.header}>
      <Logo />
      <Cart />
    </header>
  </>
)

export default Home
