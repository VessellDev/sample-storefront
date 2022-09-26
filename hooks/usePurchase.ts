export const usePurchase = () => {
  const STORAGE_KEY = 'PURCHASE_ID'

  const setPurchaseId = (id: string) => localStorage.setItem(STORAGE_KEY, id)

  const getPurchaseId = () => localStorage.getItem(STORAGE_KEY) || undefined

  return { setPurchaseId, getPurchaseId }
}
