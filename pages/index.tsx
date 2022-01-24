import Cart from 'components/cart'
import Highlight from 'components/highlight'
import Logo from 'components/logo'
import Selection from 'components/selection'
import { NextPage } from 'next'
import styles from './index.module.css'
import { mockProducts, mockCategories } from 'mock'
import useScrollPosition from '@react-hook/window-scroll'
import classnames from 'classnames'

const Home: NextPage = () => {
  const scrollY = useScrollPosition()
  const scrolling = scrollY > 0

  return (
    <>
      <section className={styles.highlights}>
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
      </section>
      <section className={styles.selections}>
        <Selection
          className={styles.selection}
          title='Mais Baratos'
          products={mockProducts.slice(0, 4)}
        />
        <Selection
          className={styles.selection}
          title='Novidades'
          products={mockProducts.slice(4, 8)}
        />
      </section>
      <header className={classnames(styles.header, { [styles.scrolling]: scrolling })}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Logo />
            <Cart />
          </div>
        </div>
      </header>
    </>
  )
}

export default Home
