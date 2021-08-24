import { FC } from 'react'
import Image from 'next/image'
import styles from './logo.module.css'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => (
  <Image
    className={[styles.logo, className].join(' ')}
    src='/images/logo.svg'
    width={100}
    height={26}
  />
)

export default Logo
