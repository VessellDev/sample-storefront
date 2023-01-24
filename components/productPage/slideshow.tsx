import Image from 'next/image'
import { FC } from 'react'
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined'
import { Box } from '@mui/material'

interface SlideshowProps {
  image?: string
}

const Slideshow: FC<SlideshowProps> = ({ image }) =>
  image ? (
    <Image src={image} layout="fill" objectFit="contain" alt="Main Image" />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.1,
      }}
    >
      <NoPhotographyOutlinedIcon color="primary" sx={{ fontSize: 350 }} />
    </Box>
  )

export default Slideshow
