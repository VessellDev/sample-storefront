import { Avatar, Chip, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { AttributeType } from 'types/fullProduct'
import styles from './attribute.module.css'

interface AttributeProps extends AttributeType {
  selected?: string[]
  onSelect: (attributeId: string, optionId: string) => void
}

const Attribute: FC<AttributeProps> = ({
  id: attributeId,
  label,
  options,
  selected,
  onSelect,
}) => {
  const isSelected = useCallback(
    (id: string) => selected?.includes(id),
    [selected],
  )

  return (
    <div className={styles.attribute}>
      <Typography variant="subtitle2">{label}</Typography>
      <div>
        {options.map(({ id: optionId, label, hex }) => (
          <Chip
            key={optionId}
            style={isSelected(optionId) ? { backgroundColor: hex } : undefined}
            color={isSelected(optionId) ? 'primary' : 'default'}
            variant={!isSelected(optionId) ? 'outlined' : undefined}
            className={styles.option}
            label={label}
            clickable
            onClick={() => onSelect(attributeId, optionId)}
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
