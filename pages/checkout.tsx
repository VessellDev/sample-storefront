import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material'
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
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import SDK from 'sdk'

const Checkout: NextPage = () => {
  const { getPurchaseId } = usePurchase()
  const { isLogged } = useAuth({ redirect: true })
  const [currentIndex, setCurrentIndex] = useState(1)

  const { data: customer } = useQuery(
    ['customer'],
    async () => {
      const { me } = await SDK.request('query')({
        me: {
          '...on Customer': {
            name: true,
            identificationNumber: true,
            phoneNumber: true,
          },
          '...on User': { name: true },
        },
      })

      return me
    },
    { enabled: isLogged },
  )

  const { data: purchase } = useQuery(
    ['purchase'],
    async () => {
      const purchaseId = getPurchaseId()

      const { activePurchase } = await SDK.request('query')({
        activePurchase: [
          { purchaseId },
          {
            id: true,
            paymentMethodCode: true,
            shippingClassification: true,
            address: { id: true },
            customer: {
              name: true,
              identificationNumber: true,
              phoneNumber: true,
            },
            items: {
              id: true,
              inventoryItem: {
                product: {
                  mainImage: { asset: { url: true } },
                  name: true,
                },
                price: true,
              },
            },
            total: true,
          },
        ],
      })

      return activePurchase
    },
    { enabled: isLogged },
  )

  useEffect(() => {
    if (!customer) return setCurrentIndex(1)
    if (!purchase) return

    if (purchase.paymentMethodCode) return setCurrentIndex(5)
    if (purchase.shippingClassification) return setCurrentIndex(4)
    if (purchase.address) return setCurrentIndex(3)

    if (
      purchase.customer?.name &&
      purchase.customer?.identificationNumber &&
      purchase.customer?.phoneNumber
    ) {
      return setCurrentIndex(2)
    }
  }, [customer, purchase])

  if (!isLogged || !purchase || !customer) return <LinearProgress />

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
                customer={customer}
                purchase={purchase}
              />
              <Step
                index={2}
                title="Endereço"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={AddressForm}
                Resume={AddressResume}
                customer={customer}
                purchase={purchase}
              />
              <Step
                index={3}
                title="Frete"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={ShippingForm}
                Resume={ShippingResume}
                customer={customer}
                purchase={purchase}
              />
              <Step
                index={4}
                title="Pagamento"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={PaymentForm}
                Resume={PaymentResume}
                customer={customer}
                purchase={purchase}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" disabled={currentIndex !== 5}>
                  FINALIZAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Checkout
