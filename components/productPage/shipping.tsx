import { CircularProgress, Collapse, TextField, Typography } from '@material-ui/core'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import styles from './shipping.module.css'
import InputMask from 'react-input-mask'
import { ShippingOptionType } from 'types/shipping'
import moment from 'moment'
import ShippingOption from './shippingOption'

interface ShippingProps {
  active: boolean
  onFillCep: (cep: string) => void
  options: ShippingOptionType[]
  shippingType: string | undefined
  onChooseShippingType: (type: string) => void
}

const Shipping: FC<ShippingProps> = ({ active, onFillCep, options, shippingType, onChooseShippingType }) => {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const rawCep = cep.match(/\d/g)
    if (!rawCep || rawCep.length < 8) return

    onFillCep(rawCep.join(''))
    setLoading(true)
  }, [cep])

  useEffect(() => {
    setLoading(false)
  }, [options])

  return (
    <div className={classnames(styles.shipping, { [styles.active]: active })}>
      <InputMask mask='99.999-999' value={cep} onChange={e => setCep(e.target.value)}>
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            label='CEP'
            InputLabelProps={{ shrink: true }}
            placeholder='Digite seu CEP para calcular o frete'
            InputProps={{
              endAdornment: loading && <CircularProgress size={24} />
            }}
          />
        )}
      </InputMask>
      <Collapse in={options && loading === false}>
        <div className={styles.options}>
          {options.map(option => (
            <ShippingOption
              key={option.type}
              {...option}
              onClick={() => onChooseShippingType(option.type)}
            />
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default Shipping
