import { Button, Typography } from "@material-ui/core"
import { FC } from "react"
import styles from "./highlight.module.css"
import { ArrowForward } from "@material-ui/icons"
import Link from "next/link"
import { useProjectCode } from "hooks/projectCode"

interface HighlightProps {
  className: string
  href: string
}

const Highlight: FC<HighlightProps> = ({ className, children, href }) => {
  const { getLinkWithQuery } = useProjectCode()

  return (
    <div className={[styles.highlight, className].join(" ")}>
      <Typography className={styles.title} variant="h3" color="primary">
        {children}
      </Typography>
      <Link href={getLinkWithQuery(href)} passHref>
        <Button
          className={styles.button}
          component="span"
          endIcon={<ArrowForward />}
        >
          VER OFERTAS
        </Button>
      </Link>
    </div>
  )
}

export default Highlight
