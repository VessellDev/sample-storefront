const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function useFormatPrice() {
  return (price: number) => numberFormat.format(price)
}
