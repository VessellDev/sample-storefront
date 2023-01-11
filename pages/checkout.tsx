import { LoadingButton } from '@mui/lab'
import { Box, Container, LinearProgress, Typography } from '@mui/material'
import { PaymentMethodGroup } from '@vessell/sdk/dist/cjs/zeus'
import Breadcrumbs from 'components/breadcrumbs'
import Step from 'components/checkout/step'
import AddressForm from 'components/checkout/stepForms/addressForm'
import PaymentForm from 'components/checkout/stepForms/paymentForm'
import PersonalInfoForm from 'components/checkout/stepForms/personalInfoForm'
import ShippingForm from 'components/checkout/stepForms/shippingForm'
import AddressResume from 'components/checkout/stepResumes/addressResume'
import PaymentResume from 'components/checkout/stepResumes/paymentResume'
import PersonalInfoResume from 'components/checkout/stepResumes/personalInfoResume'
import ShippingResume from 'components/checkout/stepResumes/shippingResume'
import Summary from 'components/checkout/summary'
import Logo from 'components/logo'
import { useAuth } from 'hooks/useAuth'
import { usePurchase } from 'hooks/usePurchase'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import SDK from 'sdk'

const Checkout: NextPage = () => {
  const { getPurchaseId, removePurchaseId } = usePurchase()
  const { isLogged } = useAuth({ redirect: true })
  const [currentIndex, setCurrentIndex] = useState(1)
  const router = useRouter()

  const handlePurchaseSuccess = (id: string) => {
    removePurchaseId()
    router.push(`/pedidos/${id}`)
  }

  const { data: purchase } = useQuery(
    ['purchase'],
    async () => {
      const purchaseId = getPurchaseId()

      const { activePurchase } = await SDK.request('query')({
        activePurchase: [
          { purchaseId },
          {
            id: true,
            paymentMethodGroup: true,
            shippingClassification: true,
            shippingPrice: true,
            maxDeliveryTime: true,
            minDeliveryTime: true,
            address: {
              id: true,
              postalCode: true,
              city: true,
              state: true,
              street: true,
              neighborhood: true,
              number: true,
              complement: true,
            },
            customer: {
              name: true,
              identificationNumber: true,
              phoneNumber: true,
            },
            items: {
              id: true,
              quantity: true,
              inventoryItem: {
                id: true,
                product: {
                  mainImage: { asset: { url: true } },
                  name: true,
                },
                price: true,
              },
            },
            total: true,
            paymentAdditionalData: true,
          },
        ],
      })

      return activePurchase
    },
    { enabled: isLogged },
  )

  const { mutate: closePurchase, isLoading } = useMutation(
    () =>
      SDK.request('mutation')({
        closePurchase: { id: true },
      }),
    {
      onSuccess: (data) => handlePurchaseSuccess(data.closePurchase.id),
    },
  )

  const moveToCheckpoint = (checkpoint: number) =>
    setCurrentIndex(Math.max(currentIndex, checkpoint))

  useEffect(() => {
    if (!purchase) return
    if (!purchase.customer) return moveToCheckpoint(1)

    if (
      purchase.paymentMethodGroup &&
      purchase.paymentMethodGroup !== PaymentMethodGroup.CreditCard
    )
      return moveToCheckpoint(5)
    if (purchase.shippingClassification) return moveToCheckpoint(4)
    if (purchase.address) return moveToCheckpoint(3)

    if (
      purchase.customer?.name &&
      purchase.customer?.identificationNumber &&
      purchase.customer?.phoneNumber
    ) {
      return moveToCheckpoint(2)
    }
  }, [purchase])

  if (!isLogged || !purchase) return <LinearProgress />

  return (
    <Box>
      <Box display="flex" alignItems="center" height={112} p={4}>
        <Logo />
        <Breadcrumbs crumbs={[{ href: '/checkout', label: 'Checkout' }]} />
      </Box>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" gap={2} py={9}>
          <Typography variant="h2">Checkout</Typography>
          <Box display="flex" gap={3}>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <Summary purchase={purchase} />
            </Box>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <Step
                index={1}
                title="Informação Pessoal"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={PersonalInfoForm}
                Resume={PersonalInfoResume}
                purchase={purchase}
              />
              <Step
                index={2}
                title="Endereço"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={AddressForm}
                Resume={AddressResume}
                purchase={purchase}
              />
              <Step
                index={3}
                title="Frete"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={ShippingForm}
                Resume={ShippingResume}
                purchase={purchase}
              />
              <Step
                index={4}
                title="Pagamento"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={PaymentForm}
                Resume={PaymentResume}
                purchase={purchase}
              />
              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  variant="contained"
                  disabled={currentIndex !== 5}
                  onClick={() => closePurchase()}
                  loading={isLoading}
                >
                  FINALIZAR
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Checkout
