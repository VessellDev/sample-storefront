import { ShippingOptionType } from 'types/shipping'

const mockShippingOptions: ShippingOptionType[] = [
  {
    label: 'Econômico',
    type: 'cheapest',
    delivery: {
      min: 4,
      max: 7
    },
    price: 32.12
  },
  {
    label: 'Expresso',
    type: 'fastest',
    delivery: {
      min: 2,
      max: 4
    },
    price: 53.86
  }
]

export default mockShippingOptions
