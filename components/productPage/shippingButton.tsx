import { FC, useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { Cancel, LocalShipping } from '@mui/icons-material'
import styles from './shippingButton.module.css'
import { GraphQLTypes, ShippingClassification } from '@vessell/sdk/lib/zeus'
import { useShippingLabel } from 'hooks/useShippingLabel'

interface ShippingButtonProps {
  active: boolean
  onClick: () => void
  options: GraphQLTypes['CalculateShippingResult'][]
  shippingType: ShippingClassification | undefined
}

const ShippingButton: FC<ShippingButtonProps> = ({
  active,
  onClick,
  options,
  shippingType,
}) => {
  const [maxWidth, setMaxWidth] = useState(0)
  const priceEl = useRef<HTMLSpanElement>(null)
  const { getLabel } = useShippingLabel()

  const getButtonContent = (): [string, number?] => {
    if (shippingType) {
      const option = options.find(
        (option) => option.classification === shippingType,
      ) as GraphQLTypes['CalculateShippingResult']

      return [getLabel(option.classification), option.price]
    }
    if (options.length > 0) {
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
