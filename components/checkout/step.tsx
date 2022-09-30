import { CheckCircle } from '@mui/icons-material'
import { Box, Card, CardProps, Collapse, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useQueryClient } from 'react-query'

type Customer = {
  name?: string
  identificationNumber?: string
  phoneNumber?: string
}

type Purchase = {
  id: string
  items: {
    id: string
    inventoryItem: {
      product: {
        mainImage?: { asset: { url: string } }
        name: string
      }
      price: number
    }
  }[]
  total: number
}

type StepDataProps = {
  customer: Customer
  purchase: Purchase
}

type StepProps = CardProps &
  StepDataProps & {
    index: number
    title: string
    currentIndex: number
    Form: FC<StepFormProps>
    Resume: FC<StepResumeProps>
    setCurrentIndex: (index: number) => void
    customer: Customer
    purchase: Purchase
  }

export type StepFormProps = StepDataProps & {
  onSuccess: () => void
  onGoBack: () => void
}

export type StepResumeProps = StepDataProps & {
  onClick: () => void
}

const Step: FC<StepProps> = ({
  index,
  title,
  currentIndex,
  setCurrentIndex,
  Form,
  Resume,
  customer,
  purchase,
  ...props
}) => {
  const queryClient = useQueryClient()

  const handleMoveForward = useCallback(() => {
    setCurrentIndex(index + 1)
  }, [index])

  const handleMoveBack = useCallback(() => {
    queryClient.invalidateQueries(['customer', 'purchase'])
    setCurrentIndex(index)
  }, [index])

  return (
    <Card {...props}>
      <Box px={3} py={2} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h3"
            color={index > currentIndex ? 'secondary' : 'textPrimary'}
          >
            {index}. {title}
          </Typography>
          {currentIndex > index && <CheckCircle color="success" />}
        </Box>
        <Collapse in={currentIndex >= index} unmountOnExit>
          {currentIndex <= index && (
            <Form
              customer={customer}
              purchase={purchase}
              onSuccess={handleMoveForward}
              onGoBack={handleMoveBack}
            />
          )}
          {currentIndex > index && (
            <Resume
              customer={customer}
              purchase={purchase}
              onClick={handleMoveBack}
            />
          )}
        </Collapse>
      </Box>
    </Card>
  )
}

export default Step
