import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import styles from './highlight.module.css'
import { ArrowForward } from '@mui/icons-material'
import Link from 'next/link'

interface HighlightProps {
  className: string
  href: string
}

const Highlight: FC<HighlightProps> = ({ className, children, href }) => (
  <div className={[styles.highlight, className].join(' ')}>
    <Typography className={styles.title} variant="h3" color="primary">
      {children}
    </Typography>
    <Link href={href} passHref>
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

export default Highlight
