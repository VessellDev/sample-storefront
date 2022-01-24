import { FC, useState } from 'react'
import { Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@material-ui/core'
import styles from './filters.module.css'
import { mockFilters } from 'mock'
import { FilterList, KeyboardArrowDown } from '@material-ui/icons'
import classnames from 'classnames'
import useScrollPosition from '@react-hook/window-scroll'

const Filters: FC = () => {
  const scrollY = useScrollPosition()
  const mobile = useMediaQuery('(max-width: 1024px)')

  const [active, setActive] = useState(false)
  const filtersActive = active || (scrollY === 0 && !mobile)

  return (
    <div className={classnames(styles.container, { [styles.active]: filtersActive })}>
      <div className={styles.shadow} onClick={() => setActive(false)}/>
      <div className={styles.inputs}>
        <Collapse in={mobile ? active : true}>
          <div className={styles.container}>
            {mobile && <Typography variant='h3' className={styles.title}>
              Filtros  
            </Typography>}
            {mockFilters.map((filter, i, arr) => (
              <FormControl
                key={filter.id}
                className={styles.input}
                style={{ transitionDelay: `${(arr.length - i) * 0.05}s` }}  
              >
                <InputLabel shrink id={`${filter.id}-label`}>
                  {filter.label}
                </InputLabel>
                <Select
                  labelId={`${filter.id}-label`}
                  className={styles.select}
                  defaultValue={filter.options[0].value}
                  disableUnderline
                  IconComponent={() => <KeyboardArrowDown />}
                >
                  {filter.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </div>
        </Collapse>
      </div>
      <IconButton color='primary' onClick={() => setActive(!active)}>
        <FilterList className={classnames(styles.icon, { [styles.active]: filtersActive })} />
      </IconButton>
    </div>
  )
}

export default Filters
