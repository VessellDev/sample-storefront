import { FC, useState } from 'react'
import { Typography } from '@mui/material'
// import { FullProductType } from 'types/fullProduct'
import styles from './properties.module.css'
// import Attribute from 'components/productPage/attribute'
import Price from 'components/productPage/price'
import Shipping from 'components/productPage/shipping'
import { ShippingOptionType } from 'types/shipping'
import ShippingButton from './shippingButton'
import { mockShippingOptions } from 'mock'
import PurchaseButton from './purchaseButton'

interface PropertiesProps {
  id: string
  name: string
  slug: string
  shortDescription?: string
  mainImage?: {
    asset: {
      url: string
    }
  }
  inventoryItems?: {
    id: string
    price: number
  }[]
}

// interface Selected {
//   [key: number]: number
// }

const Properties: FC<PropertiesProps> = ({
  name,
  inventoryItems,
  shortDescription,
}) => {
  const item = inventoryItems && inventoryItems[0]
  // const [selected, setSelected] = useState<Selected>({})
  const [shippingActive, setShippingActive] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<ShippingOptionType[]>(
    [],
  )
  const [shippingType, setShippingType] = useState<string | undefined>()

  // const getInitialSelected = () => {
  //   const selected: Selected = {}

  //   attributes.forEach(attribute => {
  //     selected[attribute.id] = attribute.options[0].id
  //   })

  //   return selected
  // }

  // const setAttributeSelected = (attributeId: number, optionId: number) => {
  //   const newSelected = { ...selected }
  //   newSelected[attributeId] = optionId

  //   setSelected(newSelected)
  // }

  const fetchShipping = (cep: string) => {
    setTimeout(() => setShippingOptions([...mockShippingOptions]), 500)
  }

  const handleChooseShipping = (type: string) => {
    setShippingType(type)
    setShippingActive(false)
  }

  // useEffect(() => {
  //   setSelected(getInitialSelected())
  // }, [])

  return (
    <>
      <div>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="body1" className={styles.description}>
          {shortDescription}
        </Typography>
        {/* <div className={styles.attributes}>
          {attributes.map(attribute => (
            <Attribute
              key={attribute.id}
              {...attribute}
              selected={selected[attribute.id]}
              setSelected={(optionId: number) => setAttributeSelected(attribute.id, optionId)}
            />
          ))}
        </div> */}
      </div>
      <div className={styles.footer}>
        {item && <Price value={item.price} />}
        <div className={styles.actions}>
          <div className={styles['left-button']}>
            <ShippingButton
              active={shippingActive}
              onClick={() => setShippingActive(!shippingActive)}
              options={shippingOptions}
              shippingType={shippingType}
            />
          </div>
          <div className={styles['right-button']}>
            {item && <PurchaseButton inventoryItemId={item.id} />}
          </div>
          <Shipping
            active={shippingActive}
            onFillCep={(cep) => fetchShipping(cep)}
            options={shippingOptions}
            // shippingType={shippingType}
            onChooseShippingType={handleChooseShipping}
          />
        </div>
      </div>
    </>
  )
}

export default Properties
