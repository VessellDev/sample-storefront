import { FC } from 'react'
import Image from 'next/image'
import styles from './logo.module.css'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => (
  <Link href='/' passHref>
    <a>
      <Image
        className={[styles.logo, className].join(' ')}
        src='/images/logo.svg'
        width={100}
        height={26}
      />
    </a>
  </Link>
)

export default Logo
