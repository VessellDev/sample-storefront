import ShippingOption from '../shippingOption'
import { mockShippingOptions } from 'mock'
import { FC } from 'react'
import { StepResumeProps } from '../step'

const ShippingResume: FC<StepResumeProps> = ({ onClick }) => (
  <ShippingOption {...mockShippingOptions[0]} onClick={onClick} />
)

export default ShippingResume
