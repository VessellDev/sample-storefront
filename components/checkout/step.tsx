import { CheckCircle } from '@mui/icons-material'
import {
  Box,
  Card,
  CardProps,
  CircularProgress,
  Collapse,
  Typography,
} from '@mui/material'
import {
  PaymentMethodGroup,
  ShippingClassification,
} from '@vessell/sdk/dist/cjs/zeus'
import { useSnackbar } from 'notistack'
import { FC, useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'

type Purchase = {
  id: string
  paymentMethodGroup?: PaymentMethodGroup
  shippingClassification?: ShippingClassification
  shippingPrice?: number
  maxDeliveryTime?: number
  minDeliveryTime?: number
  address?: {
    id: string
    postalCode: string
    city: string
    state: string
    street: string
    neighborhood: string
    number: string
    complement?: string
  }
  customer?: {
    name?: string
    identificationNumber?: string
    phoneNumber?: string
  }
  items: {
    id: string
    quantity: number
    inventoryItem: {
      id: string
      product: {
        mainImage?: { asset: { url: string } }
        name: string
      }
      price: number
    }
  }[]
  total: number
  paymentAdditionalData?: any
}

type StepDataProps = {
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
    purchase: Purchase
  }

export type StepFormProps = StepDataProps & {
  onSuccess: (data: any) => void
  onError: () => void
  onGoBack: () => void
  setLoading: (loading: boolean) => void
}

export type StepResumeProps = StepDataProps & {
  onClick?: () => void
}

const Step: FC<StepProps> = ({
  index,
  title,
  currentIndex,
  setCurrentIndex,
  Form,
  Resume,
  purchase,
  ...props
}) => {
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const handleMoveForward = useCallback(async () => {
    await queryClient.invalidateQueries(['purchase'])

    setCurrentIndex(index + 1)
    setLoading(false)
  }, [index])

  const handleError = () => {
    setLoading(false)
    enqueueSnackbar('Houve um problema ao processar a requisição', {
      variant: 'error',
    })
  }

  const handleMoveBack = useCallback(() => {
    setCurrentIndex(index)
    setLoading(false)
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
          {!loading && currentIndex > index && <CheckCircle color="success" />}
          {loading && <CircularProgress size={24} />}
        </Box>
        <Collapse in={currentIndex >= index} unmountOnExit>
          {currentIndex <= index && (
            <Form
              purchase={purchase}
              onSuccess={handleMoveForward}
              onError={handleError}
              onGoBack={handleMoveBack}
              setLoading={setLoading}
            />
          )}
          {currentIndex > index && (
            <Resume purchase={purchase} onClick={handleMoveBack} />
          )}
        </Collapse>
      </Box>
    </Card>
  )
}

export default Step
