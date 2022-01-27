import { FC, useEffect, useRef, useState } from 'react'
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
  const [maxWidth, setMaxWidth] = useState(0)
  const priceEl = useRef<HTMLSpanElement>(null)
  
  const getButtonContent = (): [string, number?] => {
    if (shippingType) {
      const option = options.find(option => option.type === shippingType) as ShippingOptionType
      return [option.label, option.price]
    }
    if (options.length > 0) {
      return ['ESCOLHER FRETE']
    }

    return ['CALCULAR FRETE']
  }

  const [label, price] = getButtonContent()

  useEffect(() => {
    if (!priceEl.current) return
    console.log(price)
    if (price !== undefined) return setMaxWidth(priceEl.current.getBoundingClientRect().width * 1.6)

    setMaxWidth(0)
  }, [price])

  return (
    <div className={styles.button}>
      <Button
        color='primary'
        variant='outlined'
        startIcon={active ? <Cancel /> : <LocalShipping />}
        fullWidth
        onClick={onClick}
      >
        <div className={styles.label}>
          {label}
          <div className={styles['price-wrapper']} style={{ maxWidth }}>
            <Typography variant='h4' color='secondary' className={styles.price}>
              <span ref={priceEl}>
                {price && new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
              </span>
            </Typography>
          </div>
        </div>
      </Button>
    </div>
  )
}

export default ShippingButton
