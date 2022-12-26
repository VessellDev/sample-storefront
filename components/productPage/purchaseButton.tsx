import { Check } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { usePurchase } from 'hooks/usePurchase'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import SDK from 'sdk'

export interface PurchaseButtonProps {
  inventoryItemId: string
}

const PurchaseButton: FC<PurchaseButtonProps> = ({ inventoryItemId }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { getPurchaseId, setPurchaseId } = usePurchase()
  const queryClient = useQueryClient()

  const { mutate, isLoading, isSuccess } = useMutation(
    () => {
      const purchaseId = getPurchaseId()
      return SDK.request('mutation')({
        addOrderItem: [
          { input: { inventoryItemId, quantity: 1, purchaseId } },
          { purchaseId: true },
        ],
      })
    },
    {
      onSuccess: ({ addOrderItem }) => {
        setPurchaseId(addOrderItem.purchaseId)
        queryClient.invalidateQueries(['purchase'])

        enqueueSnackbar('Produto adicionado ao carrinho', {
          variant: 'success',
        })
      },
      onError: () => {
        enqueueSnackbar('Houve um erro ao adicionar ao carrinho', {
          variant: 'error',
        })
      },
    },
  )

  return (
    <LoadingButton
      color="primary"
      variant="contained"
      disableElevation
      fullWidth
      onClick={() => mutate()}
      loading={isLoading}
      startIcon={isSuccess && <Check />}
    >
      {isSuccess ? 'ADICIONADO' : 'COMPRAR'}
    </LoadingButton>
  )
}

export default PurchaseButton
