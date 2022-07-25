import Image from "next/image"
import { FC } from "react"

interface SlideshowProps {
  image?: string
}

const Slideshow: FC<SlideshowProps> = ({ image }) => (
  <Image src={image || ""} layout="fill" objectFit="contain" alt="Main Image" />
)

export default Slideshow
