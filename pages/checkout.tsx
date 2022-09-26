import { Box, Button, Container, Typography } from '@mui/material'
import Breadcrumbs from 'components/breadcrumbs'
import Item from 'components/checkout/item'
import Price from 'components/checkout/price'
import Step from 'components/checkout/step'
import AddressForm from 'components/checkout/stepForms/addressForm'
import PaymentForm from 'components/checkout/stepForms/paymentForm'
import PersonalInfoForm from 'components/checkout/stepForms/personalInfoForm'
import ShippingForm from 'components/checkout/stepForms/shippingForm'
import AddressResume from 'components/checkout/stepResumes/addressResume'
import PaymentResume from 'components/checkout/stepResumes/paymentResume'
import PersonalInfoResume from 'components/checkout/stepResumes/personalInfoResume'
import ShippingResume from 'components/checkout/stepResumes/shippingResume'
import Logo from 'components/logo'
import { mockProducts } from 'mock'
import { NextPage } from 'next'
import { useState } from 'react'

const Checkout: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState(1)

  return (
    <div data-scroll-section id="container">
      <Box display="flex" alignItems="center" height={112} p={4}>
        <Logo />
        <Breadcrumbs
          crumbs={[
            {
              href: '/checkout',
              label: 'Checkout',
            },
          ]}
        />
      </Box>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" gap={2} py={9}>
          <Typography variant="h2">Checkout</Typography>
          <Box display="flex" gap={3}>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              {mockProducts.slice(0, 2).map((product) => (
                <Item key={product.id} {...product} />
              ))}
              <Price value={3412} />
            </Box>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <Step
                index={1}
                title="Informação Pessoal"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={PersonalInfoForm}
                Resume={PersonalInfoResume}
              />
              <Step
                index={2}
                title="Endereço"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={AddressForm}
                Resume={AddressResume}
              />
              <Step
                index={3}
                title="Frete"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={ShippingForm}
                Resume={ShippingResume}
              />
              <Step
                index={4}
                title="Pagamento"
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                Form={PaymentForm}
                Resume={PaymentResume}
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
    </div>
  )
}

export default Checkout
