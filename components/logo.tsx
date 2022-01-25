import { FC } from 'react'
import Image from 'next/image'
import styles from './logo.module.css'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => (
  <Link href='/'>
    <Image
      className={[styles.logo, className].join(' ')}
      src='/images/logo.svg'
      width={100}
      height={26}
    />
  </Link>
)

export default Logo
