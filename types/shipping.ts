export interface ShippingOptionType {
  label: string
  type: string
  delivery: {
    min: number
    max: number
  }
  price: number
}
