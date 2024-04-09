import { api } from '@/lib/axios'

export interface CancelOrder {
  orderId: string
}



export async function CancelOrder({ orderId }: CancelOrder) {
   await api.patch(`/orders/${orderId}/cancel`)


}