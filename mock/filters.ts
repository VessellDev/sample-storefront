import { FilterType } from 'types/filter'

const mockFilters: FilterType[] = [
  {
    id: 1,
    label: 'Modelo',
    options: [
      { value: 'iphone-XR', label: 'iPhone XR' },
      { value: 'iphone-X', label: 'iPhone X' },
      { value: 'iphone-9', label: 'iPhone 9' },
      { value: 'iphone-8', label: 'iPhone 8' },
      { value: 'iphone-7', label: 'iPhone 7' }
    ]
  },
  {
    id: 2,
    label: 'Cor',
    options: [
      { value: 'grafite', label: 'Grafite' },
      { value: 'cinza-espacial', label: 'Cinza Espacial' },
      { value: 'rosê', label: 'Rosê' },
      { value: 'dourado', label: 'Dourado' },
      { value: 'preto-fosco', label: 'Preto Fosco' }
    ]
  },
  {
    id: 3,
    label: 'Capacidade',
    options: [
      { value: '256gb', label: '256GB' },
      { value: '128gb', label: '128GB' },
      { value: '64gb', label: '64GB' },
      { value: '32gb', label: '32GB' },
      { value: '16gb', label: '16GB' }
    ]
  }
]

export default mockFilters
