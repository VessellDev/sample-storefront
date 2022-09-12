import { Badge, Button, Collapse, IconButton } from '@mui/material'
import { ShoppingCartOutlined } from '@mui/icons-material'
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
  const products = mockProducts.slice(0, 4)

  useEffect(() => {
    scroll?.on('scroll', (args: any) => {
      setScrollY(args.delta?.y)
    })
  }, [scroll])

  return (
    <div>
      <div className={styles.wrapper}>
        <Collapse in={active}>
          <div
            className={classnames(styles.cart, {
              [styles.active]: active,
              [styles.scrolling]: scrolling,
            })}
          >
            <div>
              {products.map((product, index) => (
                <CartItem
                  key={product.id}
                  {...product}
                  active={active}
                  index={index}
                />
              ))}
            </div>
            <div
              style={{ transitionDelay: `${products.length * 0.05}s` }}
              className={classnames(styles.footer, { [styles.active]: active })}
            >
              <Button
                className={styles.button}
                color="primary"
                variant="contained"
                disableElevation
              >
                FINALIZAR COMPRA
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
      <IconButton color="primary" onClick={() => setActive(!active)}>
        <Badge badgeContent={products.length} color="error">
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
    </div>
  )
}

export default Cart
