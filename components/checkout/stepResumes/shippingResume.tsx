import ShippingOption from '../shippingOption'
import { mockShippingOptions } from 'mock'
import { FC } from 'react'
import { StepResumeProps } from '../step'
import { useShippingLabel } from 'hooks/useShippingLabel'

const ShippingResume: FC<StepResumeProps> = ({ onClick, purchase }) => {
  const { getLabel } = useShippingLabel()

  return (
    <ShippingOption
      price={purchase.shippingPrice!}
      type={purchase.shippingClassification!}
      delivery={{
        min: purchase.minDeliveryTime!,
        max: purchase.maxDeliveryTime!,
      }}
      label={getLabel(purchase.shippingClassification!)}
      onClick={onClick}
    />
  )
}

export default ShippingResume
