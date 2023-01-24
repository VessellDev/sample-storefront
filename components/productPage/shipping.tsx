import { Cancel, LocalShipping } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Typography,
} from '@mui/material'
import { GraphQLTypes, InputType, Selector } from '@vessell/sdk/dist/cjs/zeus'
import { useFormatPrice } from 'hooks/formatPrice'
import { useShippingLabel } from 'hooks/useShippingLabel'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import InputMask from 'react-input-mask'
import { useQuery } from 'react-query'
import SDK from 'sdk'

interface ShippingProps {
  inventoryItemId: string
}

const calculateShippingResultSelector = Selector('CalculateShippingResult')({
  classification: true,
  minDeliveryTime: true,
  maxDeliveryTime: true,
  price: true,
})

const Shipping: React.FC<ShippingProps> = ({ inventoryItemId }) => {
  const [shippingResultSelected, setShippingResultSelected] =
    useState<
      InputType<
        GraphQLTypes['CalculateShippingResult'],
        typeof calculateShippingResultSelector
      >
    >()
  const [showForm, setShowForm] = useState(false)
  const [postalCode, setPostalCode] = useState('')
  const { getLabel } = useShippingLabel()
  const formatPrice = useFormatPrice()

  const postalCodeRaw = useMemo(() => {
    return postalCode.replace(/[^0-9]/g, '')
  }, [postalCode])

  const { data, isFetching } = useQuery(
    ['calculateShipping'],
    () =>
      SDK.request('query')({
        calculateShipping: [
          {
            input: {
              postalCodeTo: postalCodeRaw,
              items: [{ inventoryItemId, quantity: 1 }],
            },
          },
          calculateShippingResultSelector,
        ],
      }),
    {
      enabled: postalCodeRaw.length === 8,
    },
  )

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
          width: '100%',
          padding: '24px',
          opacity: 0,
          transform: 'translate(0, -100%)',
          borderRadius: '16px',
          border: '1px solid black',
          backgroundColor: 'white',
          transition: 'all 0.2s ease-in-out',
          ...(showForm && {
            opacity: 1,
            top: '-16px',
          }),
        }}
      >
        <InputMask
          mask="99.999-999"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        >
          {(inputProps: any) => (
            <TextField
              {...inputProps}
              label="CEP"
              InputLabelProps={{ shrink: true }}
              placeholder="Digite seu CEP para calcular o frete"
              InputProps={{
                endAdornment: isFetching && <CircularProgress size={24} />,
              }}
            />
          )}
        </InputMask>
        <Collapse in={Boolean(data?.calculateShipping && showForm)}>
          {data?.calculateShipping?.map((result) => (
            <Box
              key={result.classification}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                mt: 2,
                backgroundColor: 'var(--light)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                },
              }}
              onClick={() => {
                setShippingResultSelected(result)
                setShowForm(false)
              }}
            >
              <div>
                <Typography variant="subtitle1" component="span">
                  {getLabel(result.classification)}
                </Typography>
              </div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Typography variant="subtitle1" component="span">
                  {formatPrice(result.price)}
                </Typography>
                <Typography variant="h4" component="span">
                  entre{' '}
                  {moment().add(result.minDeliveryTime, 'days').format('DD/MM')}{' '}
                  e{' '}
                  {moment().add(result.maxDeliveryTime, 'days').format('DD/MM')}
                </Typography>
              </Box>
            </Box>
          ))}
        </Collapse>
      </Box>
      {shippingResultSelected ? (
        <Button
          color="primary"
          variant="outlined"
          startIcon={<LocalShipping />}
          sx={{ width: 250 }}
          onClick={() => setShowForm(true)}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {getLabel(shippingResultSelected.classification)}
            <Typography variant="h4" color="secondary">
              {formatPrice(shippingResultSelected.price)}
            </Typography>
          </Box>
        </Button>
      ) : (
        <Button
          color="primary"
          variant="outlined"
          startIcon={showForm ? <Cancel /> : <LocalShipping />}
          onClick={() => setShowForm(!showForm)}
        >
          Calcular Frete
        </Button>
      )}
    </>
  )
}

export default Shipping
