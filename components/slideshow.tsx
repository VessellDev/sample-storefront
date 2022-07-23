import { Typography } from "@material-ui/core"
import { FC } from "react"
import styles from "./slideshow.module.css"

const Slideshow: FC = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <Typography variant="h3">Loja DEMO Vessell!</Typography>
    </div>
  </div>
)

export default Slideshow
