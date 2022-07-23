import { Typography } from "@material-ui/core"
import { useProjectCode } from "hooks/projectCode"
import Link from "next/link"
import { FC } from "react"
import styles from "./categories.module.css"

interface CategoriesProps {
  categories: {
    id: string
    name: string
    slug: string
  }[]
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const { getLinkWithQuery } = useProjectCode()

  return (
    <div className={styles.categories}>
      <Typography className={styles.title} variant="h2">
        Compre por Categoria
      </Typography>
      <div className={styles.list}>
        {categories.map((category) => (
          <Link href={getLinkWithQuery(`/${category.slug}`)} passHref>
            <a>
              <Typography variant="body1" className={styles.category}>
                {category.name}
              </Typography>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
