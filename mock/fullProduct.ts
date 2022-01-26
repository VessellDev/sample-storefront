import { FullProductType } from 'types/fullProduct'

const mockFullProduct: FullProductType = {
  id: 1,
  slug: 'iphone-xr-256gb-grafite',
  image: '/images/full-image.png',
  name: 'iPhone XR 256GB Grafíte',
  price: 3412.00,
  attributes: [
    {
      id: 1,
      label: 'Cor',
      options: [
        { id: 1, label: 'Grafíte', hex: '#36413B' },
        { id: 2, label: 'Cinza Espacial', hex: '#A1A1A1' },
        { id: 3, label: 'Rosê', hex: '#F1CDB5' },
        { id: 4, label: 'Dourado', hex: '#EEC123'  },
        { id: 5, label: 'Preto Fosco', hex: '#212121' }
      ]
    },
    {
      id: 2,
      label: 'Capacidade',
      options: [
        { id: 1, label: '16GB' },
        { id: 2, label: '32GB' },
        { id: 3, label: '64GB' },
        { id: 4, label: '128GB' },
        { id: 5, label: '256GB' }
      ]
    }
  ],
  category: {
    id: 2,
    label: 'iPhone',
    slug: 'iphone'
  }
}

export default mockFullProduct
