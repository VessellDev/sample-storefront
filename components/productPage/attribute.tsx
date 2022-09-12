import { Avatar, Chip, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { AttributeType } from 'types/fullProduct'
import styles from './attribute.module.css'

interface AttributeProps extends AttributeType {
  selected?: number
  setSelected: (id: number) => void
}

const Attribute: FC<AttributeProps> = ({
  label,
  options,
  selected,
  setSelected,
}) => {
  const isSelected = useCallback((id: number) => selected === id, [selected])

  return (
    <div className={styles.attribute}>
      <Typography variant="subtitle2">{label}</Typography>
      <div>
        {options.map(({ id, label, hex }) => (
          <Chip
            key={id}
            style={isSelected(id) ? { backgroundColor: hex } : undefined}
            color={isSelected(id) ? 'primary' : 'default'}
            variant={isSelected(id) ? 'default' : 'outlined'}
            className={styles.option}
            label={label}
            clickable
            onClick={() => setSelected(id)}
            avatar={
              hex ? (
                <Avatar
                  className={styles.avatar}
                  style={{ backgroundColor: hex }}
                >
                  {' '}
                </Avatar>
              ) : undefined
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Attribute
