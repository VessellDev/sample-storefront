import { IconButton } from '@material-ui/core'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { FC } from 'react'

interface CartProps {
  className?: string
}

const Cart: FC<CartProps> = ({ className }) => (
  <div className={className}>
    <IconButton color='primary'>
      <ShoppingCartOutlined />
    </IconButton>
  </div>
)

export default Cart
