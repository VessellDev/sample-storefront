import { CircularProgress, IconButton, Typography } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import classnames from 'classnames'
import { FC, useMemo } from 'react'
import styles from './cartItem.module.css'
import { useMutation, useQueryClient } from 'react-query'
import { usePurchase } from 'hooks/usePurchase'
import SDK from 'sdk'

interface CartItemProps {
  id: string
  price: number
  quantity: number
  inventoryItem?: {
    product: {
      name: string
      mainImage?: { asset: { url: string } }
    }
  }
  active: boolean
}

const CartItem: FC<CartItemProps> = ({
  id,
  price,
  quantity,
  inventoryItem,
  active,
}) => {
  const { getPurchaseId } = usePurchase()
  const queryClient = useQueryClient()

  const { mutate: increment, isLoading: loadingIncrement } = useMutation(
    () => {
      const purchaseId = getPurchaseId()
      return SDK.request('mutation')({
        incrementOrderItem: [
          { input: { itemId: id, quantity: 1, purchaseId } },
          { status: true },
        ],
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['purchase']),
    },
  )

  const { mutate: decrement, isLoading: loadingDecrement } = useMutation(
    async () => {
      const purchaseId = getPurchaseId()

      quantity > 1
        ? await SDK.request('mutation')({
            decrementOrderItem: [
              { input: { itemId: id, quantity: 1, purchaseId } },
              { status: true },
            ],
          })
        : await SDK.request('mutation')({
            removeOrderItem: [
              { input: { itemId: id, purchaseId } },
              { status: true },
            ],
          })
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['purchase']),
    },
  )

  const loading = useMemo(
    () => loadingIncrement || loadingDecrement,
    [loadingIncrement, loadingDecrement],
  )

  return (
    <div className={classnames(styles.item, { [styles.active]: active })}>
      <div className={styles.info}>
        <div
          className={styles.image}
          style={{ transform: loading ? 'scale(0.75)' : undefined }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundImage: `url(${inventoryItem?.product.mainImage?.asset.url})`,
              transition: 'opacity 0.2s ease-in-out',
              opacity: loading ? 0.54 : 1,
            }}
          />
          {loading && <CircularProgress />}
        </div>
        <div className={styles.content}>
          <Typography variant="h4" color="secondary">
            {inventoryItem?.product.name}
          </Typography>
          <Typography variant="subtitle1">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
          </Typography>
        </div>
      </div>
      <div className={styles.actions}>
        <IconButton
          color="primary"
          onClick={() => decrement()}
          disabled={loading}
        >
          <RemoveCircle />
        </IconButton>
        <span className={styles.amount}>{quantity}</span>
        <IconButton
          color="primary"
          onClick={() => increment()}
          disabled={loading}
        >
          <AddCircle />
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
