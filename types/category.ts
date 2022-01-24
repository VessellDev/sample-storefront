import { ProductType } from './product'

export interface CategoryType {
  id: number
  label: string
  slug: string
  products: ProductType[]
}
