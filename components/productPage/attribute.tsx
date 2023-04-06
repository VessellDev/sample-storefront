import { Avatar, Chip, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import styles from './attribute.module.css'
import Link from 'next/link'
import { findMatchingSlug } from 'helpers/slugHelper'

interface AttributeProps {
  attribute: {
    id: string
    name: string
  }
  variantOptions: {
    option:
      | { id: string; name: string; color: string }
      | { id: string; name: string }
      | { id: string; name: string }
  }[]
  childProducts: {
    slug: string
    attributeValueOptions: {
      attributeId: string
      optionId: string
    }[]
  }[]
  attributeValueOptions: {
    attributeId: string
    optionId: string
  }[]
  variantAttributeIds: string[]
}

const Attribute: FC<AttributeProps> = ({
  attribute,
  variantOptions,
  childProducts,
  attributeValueOptions,
  variantAttributeIds,
}) => {
  const selected = useMemo(
    () =>
      attributeValueOptions.find(
        ({ attributeId }) => attributeId === attribute.id,
      )?.optionId,
    [attributeValueOptions],
  )

  return (
    <div className={styles.attribute}>
      <Typography variant="subtitle2">{attribute.name}</Typography>
      <div>
        {variantOptions
          .map((variantOption) => ({
            ...variantOption,
            slug: findMatchingSlug(childProducts, [
              ...attributeValueOptions
                .filter(({ attributeId }) =>
                  variantAttributeIds.includes(attributeId),
                )
                .filter(
                  ({ attributeId, optionId }) =>
                    attributeId !== attribute.id &&
                    optionId !== variantOption.option.id,
                ),
              { attributeId: attribute.id, optionId: variantOption.option.id },
            ]) as string,
          }))
          .map(({ option: { id, name, ...option }, slug }) => (
            <Link key={id} href={slug} passHref>
              <Chip
                disabled={!slug}
                component="a"
                key={id}
                color={id === selected ? 'primary' : 'default'}
                variant={id !== selected ? 'outlined' : undefined}
                className={styles.option}
                label={name}
                clickable
                avatar={
                  'color' in option ? (
                    <Avatar
                      className={styles.avatar}
                      style={{ backgroundColor: option.color }}
                    >
                      {' '}
                    </Avatar>
                  ) : undefined
                }
              />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Attribute
