import { TextField } from '@material-ui/core'
import classnames from 'classnames'
import { FC, useState } from 'react'
import styles from './shipping.module.css'

interface ShippingProps {
  active: boolean
}

const Shipping: FC<ShippingProps> = ({ active }) => {
  return (
    <div className={classnames(styles.shipping, { [styles.active]: active })}>
      <TextField
        placeholder='Digite seu CEP para calcular o frete'
      />
    </div>
  )
}

export default Shipping
