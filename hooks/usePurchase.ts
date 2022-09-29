import SDK from 'sdk'

export const usePurchase = () => {
  const STORAGE_KEY = 'PURCHASE_ID'

  const setPurchaseId = (id: string) => localStorage.setItem(STORAGE_KEY, id)

  const getPurchaseId = () => localStorage.getItem(STORAGE_KEY) || undefined

  const removePurchaseId = () => localStorage.removeItem(STORAGE_KEY)

  const setupActivePurchaseId = async () => {
    const purchaseId = getPurchaseId()
    if (!purchaseId) return

    return SDK.claimPurchase([{ purchaseId }, { id: true }])
  }

  return {
    setPurchaseId,
    getPurchaseId,
    removePurchaseId,
    setupActivePurchaseId,
  }
}
