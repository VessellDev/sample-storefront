import { IconButton, Typography } from "@material-ui/core"
import { AddCircle, RemoveCircle } from "@material-ui/icons"
import classnames from "classnames"
import { FC, useCallback, useState } from "react"
import { ProductType } from "types/product"
import styles from "./cartItem.module.css"

// interface CartItemProps extends ProductType {
//   active: boolean
//   index: number
//   image: string
// }

const CartItem: FC<any> = ({ image, name, price, active, index }) => {
  const [amount, setAmount] = useState(0)

  const handleRemove = useCallback(() => {
    setAmount(Math.max(amount - 1, 0))
  }, [amount])

  const handleAdd = useCallback(() => {
    setAmount(amount + 1)
  }, [amount])

  return (
    <div
      style={{ transitionDelay: `${index * 0.05}s` }}
      className={classnames(styles.item, { [styles.active]: active })}
    >
      <div className={styles.info}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.content}>
          <Typography variant="h4" color="secondary">
            {name}
          </Typography>
          <Typography variant="subtitle1">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(price)}
          </Typography>
        </div>
      </div>
      <div className={styles.actions}>
        <IconButton color="primary" onClick={handleRemove}>
          <RemoveCircle />
        </IconButton>
        <span className={styles.amount}>{amount}</span>
        <IconButton color="primary" onClick={handleAdd}>
          <AddCircle />
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
