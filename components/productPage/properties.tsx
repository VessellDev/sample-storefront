import { FC, useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { FullProductType } from 'types/fullProduct'
import styles from './properties.module.css'
import Attribute from 'components/productPage/attribute'
import Price from 'components/productPage/price'
import Shipping from 'components/productPage/shipping'
import { ShippingOptionType } from 'types/shipping'
import ShippingButton from './shippingButton'
import { mockShippingOptions } from 'mock'
import { GraphQLTypes, ProductAttributeType } from '@vessell/sdk/lib/zeus'

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
  price?: {
    minPrice: number
  }
  variantAttributes?: GraphQLTypes['Product']['variantAttributes']
  children?: GraphQLTypes['Product']['children']
}

interface Selected {
  [key: number]: number
}

const Properties: FC<PropertiesProps> = ({
  name,
  price,
  shortDescription,
  variantAttributes,
  children,
}) => {
  const [selected, setSelected] = useState<Selected>({})
  const [selectedAttributes, setSelectedAttributes] = useState<
    {
      attributeId: string
      optionId: string
    }[]
  >()
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

  const handleAttributeSelect = (attributeId: string, optionId: string) => {
    if (typeof selectedAttributes === 'undefined') {
      setSelectedAttributes([
        {
          attributeId,
          optionId,
        },
      ])
    } else {
      setSelectedAttributes(
        selectedAttributes
          .filter((a) => a.attributeId !== attributeId)
          .concat({
            attributeId,
            optionId,
          }),
      )
    }
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
        {variantAttributes && (
          <div className={styles.attributes}>
            {variantAttributes.map(({ id, attribute, variantOptions }) => (
              <Attribute
                key={id}
                id={id}
                label={attribute.name}
                selected={selectedAttributes?.map((a) => a.optionId)}
                onSelect={handleAttributeSelect}
                options={variantOptions!
                  .filter((vo) => vo.isActive)
                  .map((variantOption) => ({
                    id: variantOption.id,
                    label: (
                      variantOption.option as GraphQLTypes['ProductAttributeOption']
                    ).name,
                    hex:
                      attribute.type === ProductAttributeType.Color
                        ? (
                            variantOption.option as unknown as GraphQLTypes['ProductAttributeOptionColor']
                          ).color
                        : undefined,
                  }))}
              />
            ))}
          </div>
        )}
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
        {price && <Price value={price.minPrice} />}
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
            <Button
              color="primary"
              variant="contained"
              disableElevation
              fullWidth
            >
              COMPRAR
            </Button>
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
