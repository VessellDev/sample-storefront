import { ShippingClassification } from '@vessell/sdk/lib/zeus'

const LABELS = {
  [ShippingClassification.Fastest]: 'Expresso',
  [ShippingClassification.Cheapest]: 'Econômico',
}

export const useShippingLabel = () => {
  const getLabel = (classification: ShippingClassification) =>
    LABELS[classification]

  return { getLabel }
}
