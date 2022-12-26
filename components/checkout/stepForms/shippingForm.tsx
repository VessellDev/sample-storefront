import { Box, LinearProgress } from '@mui/material'
import ShippingOption from '../shippingOption'
import { FC, useEffect } from 'react'
import { StepFormProps } from '../step'
import { useMutation, useQuery } from 'react-query'
import SDK from 'sdk'
import { ShippingClassification } from '@vessell/sdk/dist/cjs/zeus'
import { useShippingLabel } from 'hooks/useShippingLabel'

const ShippingForm: FC<StepFormProps> = ({
  onSuccess,
  purchase,
  setLoading,
}) => {
  const { getLabel } = useShippingLabel()

  const { data, isFetching } = useQuery(['calculateShipping'], () =>
    SDK.request('query')({
      calculateShipping: [
        {
          input: {
            postalCodeTo: purchase.address?.postalCode!,
            items: purchase.items.map((item) => ({
              inventoryItemId: item.inventoryItem.id,
              quantity: item.quantity,
            })),
          },
        },
        {
          classification: true,
          maxDeliveryTime: true,
          minDeliveryTime: true,
          price: true,
        },
      ],
    }),
  )

  const { mutate, isLoading } = useMutation(
    (shippingClassification: ShippingClassification) =>
      SDK.request('mutation')({
        setPurchaseShippingClassification: [
          { shippingClassification },
          { id: true },
        ],
      }),
    { onSuccess },
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {!data?.calculateShipping && <LinearProgress />}
      {data?.calculateShipping?.map((option) => (
        <Box
          key={option.classification}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateX(8px)',
            },
          }}
        >
          <ShippingOption
            label={getLabel(option.classification)}
            type={option.classification}
            delivery={{
              min: option.minDeliveryTime,
              max: option.maxDeliveryTime,
            }}
            price={option.price}
            onClick={() => mutate(option.classification)}
          />
        </Box>
      ))}
    </Box>
  )
}

export default ShippingForm
