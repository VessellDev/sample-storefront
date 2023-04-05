interface AttributeValueOption {
  attributeId: string
  optionId: string
}

interface Child {
  slug: string
  attributeValueOptions: AttributeValueOption[]
}

export const findMatchingSlug = (
  children: Child[],
  attributeValueOptions: AttributeValueOption[],
) => {
  console.log(children, attributeValueOptions)
  return (
    children.find(
      (child) =>
        attributeValueOptions
          .map((attributeValueOption) =>
            child.attributeValueOptions.find(
              ({ attributeId, optionId }) =>
                attributeId === attributeValueOption.attributeId &&
                optionId === attributeValueOption.optionId,
            ),
          )
          .filter((matched) => !matched).length === 0,
    )?.slug || ''
  )
}
