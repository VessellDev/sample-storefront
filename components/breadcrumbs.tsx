import { FC } from 'react'
import styles from './breadcrumbs.module.css'
import { Breadcrumbs as MUIBreadcrumbs, Link } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

interface Crumb {
  href: string
  label: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {

  return (
    <MUIBreadcrumbs className={styles.container} color='primary'>
      {crumbs.map(crumb => (
        <Link color='inherit' href={crumb.href} className={styles.link}>
          <KeyboardArrowRight fontSize='medium' />
          {crumb.label}
        </Link>
      ))}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
