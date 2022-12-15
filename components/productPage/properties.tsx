import { Typography } from '@mui/material'
import { $, Selector } from '@vessell/sdk/dist/cjs/zeus'
import Price from 'components/productPage/price'
import { FC } from 'react'
import styles from './properties.module.css'
import PurchaseButton from './purchaseButton'
import Shipping from './shipping'

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

const calculateShippingSelector = Selector('Query')({
  calculateShipping: [
    {
      input: $('input', 'CalculateShippingInput!'),
    },
    {
      classification: true,
      maxDeliveryTime: true,
      minDeliveryTime: true,
      price: true,
    },
  ],
})

const Properties: FC<PropertiesProps> = ({
  name,
  inventoryItems,
  shortDescription,
}) => {
  const item = inventoryItems && inventoryItems[0]

  return (
    <>
      <div>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="body1" className={styles.description}>
          {shortDescription}
        </Typography>
      </div>
      {item && (
        <div className={styles.footer}>
          <Price value={item.price} />
          <div className={styles.actions}>
            <div className={styles['left-button']}>
              <Shipping inventoryItemId={item.id} />
            </div>
            <div className={styles['right-button']}>
              <PurchaseButton inventoryItemId={item.id} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Properties
