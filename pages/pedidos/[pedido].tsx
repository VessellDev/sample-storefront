import { Box, Card, Container, LinearProgress, Typography } from '@mui/material'
import {
  $,
  GraphQLTypes,
  InputType,
  Selector,
} from '@vessell/sdk/dist/cjs/zeus'
import Breadcrumbs from 'components/breadcrumbs'
import Item from 'components/checkout/item'
import Price from 'components/checkout/price'
import AddressResume from 'components/checkout/stepResumes/addressResume'
import PaymentResume from 'components/checkout/stepResumes/paymentResume'
import PersonalInfoResume from 'components/checkout/stepResumes/personalInfoResume'
import ShippingResume from 'components/checkout/stepResumes/shippingResume'
import Summary from 'components/checkout/summary'
import Logo from 'components/logo'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import SDK from 'sdk'

const selector = Selector('Query')({
  purchase: [
    {
      id: $('id', 'ID!'),
    },
    {
      id: true,
      code: true,
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
        status: true,
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

const Purchase: NextPage = () => {
  const router = useRouter()
  const id = useMemo(() => router.query.pedido, [router])

  const { data: purchase } = useQuery(
    'purchase',
    async () => {
      const { purchase } = await SDK.request('query')(selector, {
        variables: { id },
      })

      return purchase
    },
    {
      enabled: Boolean(id),
    },
  )

  if (!purchase) return <LinearProgress />

  return (
    <Box>
      <Box display="flex" alignItems="center" height={112} p={4}>
        <Logo />
        <Breadcrumbs
          crumbs={[
            { href: '/pedidos', label: 'Pedidos' },
            { href: `/pedidos/${purchase.id}`, label: purchase.code },
          ]}
        />
      </Box>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" gap={2} py={9}>
          <Typography variant="h2">Pedido {purchase.code}</Typography>
          <Box display="flex" gap={3}>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <Box position="sticky" top={32}>
                <Card>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    px={3}
                    py={2}
                  >
                    <Typography variant="h3" color="textPrimary">
                      Produtos
                    </Typography>
                    {purchase.items.map(
                      ({ id, inventoryItem, quantity, status }) => (
                        <Item
                          key={id}
                          {...inventoryItem}
                          quantity={quantity}
                          status={status}
                        />
                      ),
                    )}
                    <Price value={purchase.total} />
                  </Box>
                </Card>
              </Box>
            </Box>
            <Box flex={1} display="flex" flexDirection="column" gap={2}>
              <Card>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  px={3}
                  py={2}
                >
                  <Typography variant="h3" color="textPrimary">
                    Infomações Pessoais
                  </Typography>
                  <PersonalInfoResume purchase={purchase} />
                  <Typography variant="h3" color="textPrimary">
                    Endereço
                  </Typography>
                  <AddressResume purchase={purchase} />
                  <Typography variant="h3" color="textPrimary">
                    Frete
                  </Typography>
                  <ShippingResume purchase={purchase} />
                  <Typography variant="h3" color="textPrimary">
                    Pagamento
                  </Typography>
                  <PaymentResume purchase={purchase} />
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Purchase
