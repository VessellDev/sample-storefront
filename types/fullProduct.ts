export interface CategoryType {
  id: number
  label: string
  slug: string
}

export interface AttributeOptionType {
  id: number
  label: string
  hex?: string
}

export interface AttributeType {
  id: number
  label: string
  options: AttributeOptionType[]
}

export interface FullProductType {
  id: number
  slug: string
  image: string
  name: string
  price: number
  attributes: AttributeType[]
  category: CategoryType
}