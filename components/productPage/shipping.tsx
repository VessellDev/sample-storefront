import { CircularProgress, Collapse, TextField } from '@mui/material'
import classnames from 'classnames'
import { FC, useEffect, useState } from 'react'
import styles from './shipping.module.css'
import InputMask from 'react-input-mask'
import ShippingOption from './shippingOption'
import { GraphQLTypes, ShippingClassification } from '@vessell/sdk/lib/zeus'

interface ShippingProps {
  active: boolean
  onFillCep: (cep: string) => void
  options: GraphQLTypes['CalculateShippingResult'][]
  onChooseShippingType: (type: ShippingClassification) => void
}

const Shipping: FC<ShippingProps> = ({
  active,
  onFillCep,
  options,
  onChooseShippingType,
}) => {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const rawCep = cep.match(/\d/g)
    if (!rawCep || rawCep.length < 8) return

    onFillCep(rawCep.join(''))
    setLoading(true)
  }, [cep, onFillCep])

  useEffect(() => {
    setLoading(false)
  }, [options])

  return (
    <div className={classnames(styles.shipping, { [styles.active]: active })}>
      <InputMask
        mask="99.999-999"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      >
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            label="CEP"
            InputLabelProps={{ shrink: true }}
            placeholder="Digite seu CEP para calcular o frete"
            InputProps={{
              endAdornment: loading && <CircularProgress size={24} />,
            }}
          />
        )}
      </InputMask>
      <Collapse in={options && loading === false}>
        <div className={styles.options}>
          {options.map((option) => (
            <ShippingOption
              key={option.classification}
              {...option}
              onClick={() => onChooseShippingType(option.classification)}
            />
          ))}
        </div>
      </Collapse>
    </div>
  )
}

export default Shipping
