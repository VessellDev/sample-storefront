import { FC } from "react"
import styles from "./breadcrumbs.module.css"
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link as MUILink,
} from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import Link from "next/link"
import { useProjectCode } from "hooks/projectCode"

interface Crumb {
  href: string
  label: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  const { getLinkWithQuery } = useProjectCode()

  return (
    <MUIBreadcrumbs className={styles.container} color="primary">
      {crumbs.map((crumb) => (
        <Link key={crumb.href} href={getLinkWithQuery(crumb.href)}>
          <MUILink color="inherit" className={styles.link}>
            <KeyboardArrowRight fontSize="medium" />
            {crumb.label}
          </MUILink>
        </Link>
      ))}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
