import { FC, useState } from 'react'
import { Typography } from '@mui/material'
import styles from './properties.module.css'
import Price from 'components/productPage/price'
import Shipping from 'components/productPage/shipping'
import ShippingButton from './shippingButton'
import PurchaseButton from './purchaseButton'
import { useQuery } from 'react-query'
import SDK from 'sdk'
import { GraphQLTypes, ShippingClassification } from '@vessell/sdk/lib/zeus'

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

const Properties: FC<PropertiesProps> = ({
  name,
  inventoryItems,
  shortDescription,
}) => {
  const item = inventoryItems && inventoryItems[0]
  const [cep, setCep] = useState<string>()
  const [shippingActive, setShippingActive] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<
    GraphQLTypes['CalculateShippingResult'][]
  >([])
  const [shippingType, setShippingType] = useState<ShippingClassification>()

  const {} = useQuery(
    ['productShipping'],
    () =>
      SDK.calculateShipping([
        {
          input: {
            items: [{ inventoryItemId: item?.id as string, quantity: 1 }],
            postalCodeTo: cep as string,
          },
        },
        {
          classification: true,
          maxDeliveryTime: true,
          minDeliveryTime: true,
          price: true,
        },
      ]),
    {
      enabled: Boolean(cep),
      onSuccess: (data) => {
        setShippingOptions(data || [])
      },
    },
  )

  const handleChooseShipping = (type: ShippingClassification) => {
    setShippingType(type)
    setShippingActive(false)
  }

  return (
    <>
      <div>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="body1" className={styles.description}>
          {shortDescription}
        </Typography>
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
            onFillCep={setCep}
            options={shippingOptions}
            onChooseShippingType={handleChooseShipping}
          />
        </div>
      </div>
    </>
  )
}

export default Properties
