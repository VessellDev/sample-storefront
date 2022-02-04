import { Collapse, IconButton } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import classnames from 'classnames'
import { mockProducts } from 'mock'
import { FC, useEffect, useState } from 'react'
import styles from './cart.module.css'
import CartItem from 'components/cart/cartItem'
import { useLocomotiveScroll } from 'react-locomotive-scroll'

const Cart: FC = () => {
  const [active, setActive] = useState(false)
  const { scroll } = useLocomotiveScroll()
  const [scrollY, setScrollY] = useState(0)
  const scrolling = scrollY > 0

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta.y)
    })
  }, [scroll])

  return (
    <div>
      <div className={styles.wrapper}>
        <Collapse in={active}>
          <div className={classnames(styles.cart, {
            [styles.active]: active,
            [styles.scrolling]: scrolling
          })}>
            {mockProducts.slice(0, 2).map(product => (
              <CartItem key={product.id} {...product} />
            ))}
          </div>
        </Collapse>
      </div>
      <IconButton color='primary' onClick={() => setActive(!active)}>
        <ShoppingCartOutlined />
      </IconButton>
    </div>
  )
}

export default Cart
