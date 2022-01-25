import { CategoryType } from 'types/category'
import mockProducts from './products'

const mockCategories: CategoryType[] = [
  {
    id: 1,
    label: 'Xiaomi',
    slug: 'xiaomi',
    products: mockProducts
  },
  {
    id: 2,
    label: 'iPhone',
    slug: 'iphone',
    products: mockProducts
  },
  {
    id: 3,
    label: 'Motorola',
    slug: 'motorola',
    products: mockProducts
  },
  {
    id: 4,
    label: 'Galaxy',
    slug: 'galaxy',
    products: mockProducts
  },
]

export default mockCategories
