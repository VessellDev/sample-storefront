import { Typography } from '@mui/material'
import { $, Selector } from '@vessell/sdk/dist/cjs/zeus'
import Price from 'components/productPage/price'
import { FC } from 'react'
import styles from './properties.module.css'

interface PropertiesProps {
  id: string
  name: string
  slug: string
  shortDescription?: string
  mainImage?: {
    asset: {
      url: string
    }
  }
}

const Properties: FC<PropertiesProps> = ({ name, shortDescription }) => {
  return (
    <>
      <div>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="body1" className={styles.description}>
          {shortDescription}
        </Typography>
      </div>
    </>
  )
}

export default Properties
