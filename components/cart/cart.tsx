import {
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material'
import { ShoppingCartOutlined } from '@mui/icons-material'
import classnames from 'classnames'
import { FC, useState } from 'react'
import styles from './cart.module.css'
import CartItem from 'components/cart/cartItem'
import { useQuery } from 'react-query'
import SDK from 'sdk'
import { usePurchase } from 'hooks/usePurchase'
import { OrderItemSortFields, SortDirection } from '@vessell/sdk/lib/zeus'
import Link from 'next/link'

const Cart: FC = () => {
  const { getPurchaseId } = usePurchase()
  const [active, setActive] = useState(false)

  const { data } = useQuery(['purchase'], () => {
    const purchaseId = getPurchaseId()

    return SDK.activePurchase([
      { purchaseId },
      {
        items: [
          {
            sorting: [
              { field: OrderItemSortFields.id, direction: SortDirection.ASC },
            ],
          },
          {
            id: true,
            price: true,
            quantity: true,
            inventoryItem: {
              product: { name: true, mainImage: { asset: { url: true } } },
            },
          },
        ],
      },
    ])
  })

  return (
    <div>
      <div className={styles.wrapper}>
        <Collapse in={active}>
          <div className={styles.cart}>
            {data && data.items && data.items.length > 0 && (
              <>
                <div>
                  {data.items.map((item) => (
                    <CartItem key={item.id} {...item} active={active} />
                  ))}
                </div>
                <div
                  className={classnames(styles.footer, {
                    [styles.active]: active,
                  })}
                >
                  <Link href="/checkout" passHref>
                    <Button
                      component="a"
                      className={styles.button}
                      color="primary"
                      variant="contained"
                      disableElevation
                    >
                      FINALIZAR COMPRA
                    </Button>
                  </Link>
                </div>
              </>
            )}
            {data && data.items && data.items.length === 0 && (
              <Box px={6} pb={5}>
                <Typography>Nenhum item adicionado ao carrinho</Typography>
              </Box>
            )}
          </div>
        </Collapse>
      </div>
      <IconButton color="primary" onClick={() => setActive(!active)}>
        <Badge
          badgeContent={data?.items.reduce((acc, cur) => acc + cur.quantity, 0)}
          color="error"
        >
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
    </div>
  )
}

export default Cart
