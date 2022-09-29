import { FC } from 'react'
import styles from './breadcrumbs.module.css'
import { Breadcrumbs as MUIBreadcrumbs, Link as MUILink } from '@mui/material'
import { KeyboardArrowRight } from '@mui/icons-material'
import Link from 'next/link'

interface Crumb {
  href: string
  label: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => (
  <MUIBreadcrumbs className={styles.container} color="primary">
    {crumbs
      .filter((c) => c)
      .map((crumb) => (
        <Link key={crumb.href} href={crumb.href} passHref>
          <MUILink color="inherit" className={styles.link}>
            <KeyboardArrowRight fontSize="medium" />
            {crumb.label}
          </MUILink>
        </Link>
      ))}
  </MUIBreadcrumbs>
)

export default Breadcrumbs
