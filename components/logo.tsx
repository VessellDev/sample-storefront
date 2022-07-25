import { FC } from "react"
import Image from "next/image"
import styles from "./logo.module.css"
import Link from "next/link"
import { useProjectCode } from "hooks/projectCode"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className }) => {
  const { getLinkWithQuery } = useProjectCode()

  return (
    <Link href={getLinkWithQuery("/")} passHref>
      <a>
        <Image
          className={[styles.logo, className].join(" ")}
          src="/images/logo.svg"
          width={100}
          height={26}
          alt="Logo"
        />
      </a>
    </Link>
  )
}

export default Logo
