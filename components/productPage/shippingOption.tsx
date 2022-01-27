import { FC } from 'react'
import { ShippingOptionType } from 'types/shipping'
import moment from 'moment'
import { Typography } from '@material-ui/core'
import styles from './shippingOption.module.css'

interface ShippingOptionProps extends ShippingOptionType {
  onClick: () => void
}

const ShippingOption: FC<ShippingOptionProps> = ({ label, price, delivery, onClick }) => (
  <div className={styles.wrapper}>
    <div className={styles.option} onClick={onClick}>
      <div>
        <Typography variant='subtitle1' component='span'>
          {label}
        </Typography>
      </div>
      <div className={styles.values}>
        <Typography variant='subtitle1' component='span'>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
        </Typography>
        <Typography variant='h4' component='span'>
          entre {
            moment().add(delivery.min, 'days').format('DD/MM')
          } e {
            moment().add(delivery.max, 'days').format('DD/MM')
          }
        </Typography>
      </div>
    </div>
  </div>
)

export default ShippingOption
