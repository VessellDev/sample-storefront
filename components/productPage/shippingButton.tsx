import { FC, useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Cancel, LocalShipping } from '@mui/icons-material'
import styles from './shippingButton.module.css'
import { ShippingClassification } from '@vessell/sdk/dist/cjs/zeus'
import { useShippingLabel } from 'hooks/useShippingLabel'

interface ShippingButtonProps {
  active: boolean
  wasCalculated: boolean
  selectedShippingClassification?: ShippingClassification
  selectedShippingPrice?: number
  onClick: () => void
}

const ShippingButton: FC<ShippingButtonProps> = ({
  active,
  wasCalculated,
  selectedShippingClassification,
  selectedShippingPrice,
  onClick,
}) => {
  const [maxWidth, setMaxWidth] = useState(0)
  const priceEl = useRef<HTMLSpanElement>(null)
  const { getLabel } = useShippingLabel()

  const getButtonContent = (): [string, number?] => {
    if (wasCalculated) {
      if (selectedShippingClassification) {
        return [getLabel(selectedShippingClassification), selectedShippingPrice]
      }

      return ['ESCOLHER FRETE']
    }

    return ['CALCULAR FRETE']
  }

  const [label, price] = getButtonContent()

  useEffect(() => {
    if (!priceEl.current) return
    if (price !== undefined)
      return setMaxWidth(priceEl.current.getBoundingClientRect().width * 1.6)

    setMaxWidth(0)
  }, [price])

  return (
    <div className={styles.button}>
      <Button
        color="primary"
        variant="outlined"
        startIcon={active ? <Cancel /> : <LocalShipping />}
        fullWidth
        onClick={onClick}
      >
        <div className={styles.label}>
          {label}
          <div className={styles['price-wrapper']} style={{ maxWidth }}>
            <Typography variant="h4" color="secondary" className={styles.price}>
              <span ref={priceEl}>
                {price &&
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(price)}
              </span>
            </Typography>
          </div>
        </div>
      </Button>
    </div>
  )
}

export default ShippingButton
