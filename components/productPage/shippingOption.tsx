import { FC } from 'react'
import moment from 'moment'
import { Typography } from '@mui/material'
import styles from './shippingOption.module.css'
import { ShippingClassification } from '@vessell/sdk/lib/zeus'
import { useShippingLabel } from 'hooks/useShippingLabel'

interface ShippingOptionProps {
  classification: ShippingClassification
  maxDeliveryTime: number
  minDeliveryTime: number
  price: number
  onClick: () => void
}

const ShippingOption: FC<ShippingOptionProps> = ({
  classification,
  maxDeliveryTime,
  minDeliveryTime,
  price,
  onClick,
}) => {
  const { getLabel } = useShippingLabel()

  return (
    <div className={styles.wrapper}>
      <div className={styles.option} onClick={onClick}>
        <div>
          <Typography variant="subtitle1" component="span">
            {getLabel(classification)}
          </Typography>
        </div>
        <div className={styles.values}>
          <Typography variant="subtitle1" component="span">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)}
          </Typography>
          <Typography variant="h4" component="span">
            entre {moment().add(minDeliveryTime, 'days').format('DD/MM')} e{' '}
            {moment().add(maxDeliveryTime, 'days').format('DD/MM')}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ShippingOption
