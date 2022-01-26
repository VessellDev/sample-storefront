import { FC, useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { FullProductType } from 'types/fullProduct'
import styles from './properties.module.css'
import { Cancel, LocalShipping } from '@material-ui/icons'
import Attribute from 'components/productPage/attribute'
import Shipping from 'components/productPage/shipping'

interface PropertiesProps extends FullProductType {}

interface Selected {
  [key: number]: number
}

const Properties: FC<PropertiesProps> = ({ name, price, attributes }) => {
  const [selected, setSelected] = useState<Selected>({})
  const [shippingActive, setShippingActive] = useState(false)

  const getInitialSelected = () => {
    const selected: Selected = {}

    attributes.forEach(attribute => {
      selected[attribute.id] = attribute.options[0].id
    })

    return selected
  }

  const setAttributeSelected = (attributeId: number, optionId: number) => {
    const newSelected = { ...selected }
    newSelected[attributeId] = optionId

    setSelected(newSelected)
  }

  useEffect(() => {
    setSelected(getInitialSelected())
  }, [])

  return (
    <>
      <div>
        <Typography variant='h1'>
          {name}
        </Typography>
        <div className={styles.attributes}>
          {attributes.map(attribute => (
            <Attribute
              key={attribute.id}
              {...attribute}
              selected={selected[attribute.id]}
              setSelected={(optionId: number) => setAttributeSelected(attribute.id, optionId)}
            />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.price}>
          <Typography variant='h2' component='span'>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
          </Typography>
          <Typography variant='h4'>
            em até <b>12x</b> de <b>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price / 12)}</b>
          </Typography>
        </div>
        <div className={styles.actions}>
          <div className={styles['left-button']}>
            <Button
              color='primary'
              variant='outlined'
              startIcon={shippingActive ? <Cancel /> : <LocalShipping />}
              fullWidth
              onClick={() => setShippingActive(!shippingActive)}
            >
              CALCULAR FRETE
            </Button>
          </div>
          <div className={styles['right-button']}>
            <Button color='primary' variant='contained' disableElevation fullWidth>
              COMPRAR
            </Button>
          </div>
          <Shipping active={shippingActive} />
        </div>
      </div>
    </>
  )
}

export default Properties
