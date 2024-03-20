import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowUp, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { useState } from "react";


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
      <Button variant="ghost" size="xs">
        <X className="w-3 h-3 mr-2"/>
        Cancelar
      </Button>
    </TableCell>
  </TableRow>
  )
}