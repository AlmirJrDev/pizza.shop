import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowUp, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";


interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen]= useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn  } = useMutation({
    mutationFn: CancelOrder,
    async onSuccess(_, {orderId}) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled'}
            }

              return order
          })
        })
      })
    }
  })
  return(
    <TableRow >
    <TableCell>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="w-3 h-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
        </DialogTrigger>
        <OrderDetails open={isDetailsOpen} orderId={order.orderId}/>
      </Dialog>
    </TableCell>
    <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
   
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
    <TableCell>
    <Button variant="outline" size="xs">
        <ArrowUp className="w-3 h-3 mr-2"/>
        Aprovar
      </Button>
    </TableCell>
    <TableCell>
      <Button disabled={!['pending', 'processing'].includes(order.status)} onClick={() => cancelOrderFn({orderId: order.orderId})} variant="ghost" size="xs">
        <X className="w-3 h-3 mr-2"/>
        Cancelar
      </Button>
    </TableCell>
  </TableRow>
  )
}