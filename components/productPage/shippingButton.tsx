import { FC } from 'react'
import { Button, Typography } from '@material-ui/core'
import { ShippingOptionType } from 'types/shipping'
import { Cancel, LocalShipping } from '@material-ui/icons'
import styles from './shippingButton.module.css'

interface ShippingButtonProps {
  active: boolean
  onClick: () => void
  options: ShippingOptionType[]
  shippingType: string | undefined
}

const ShippingButton: FC<ShippingButtonProps> = ({ active, onClick, options, shippingType }) => {
  
  const getShippingLabel = () => {
    if (shippingType) {
      const option = options.find(option => option.type === shippingType)
      if (!option) return

      return <>
        {option.label}&nbsp;
        <Typography variant='h4' color='secondary' className={styles.price}>
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.price)}
        </Typography>
      </>
    }
    if (options.length > 0) {
      return 'ESCOLHER FRETE'
    }

    return 'CALCULAR FRETE'
  }

  return (
    <Button
      color='primary'
      variant='outlined'
      startIcon={active ? <Cancel /> : <LocalShipping />}
      fullWidth
      onClick={onClick}
    >
      <div className={styles.label}>
        {getShippingLabel()}
      </div>
    </Button>
  )
}

export default ShippingButton
