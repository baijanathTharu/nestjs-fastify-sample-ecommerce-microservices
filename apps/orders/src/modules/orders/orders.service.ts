import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  orders: Array<{
    id: number;
    name: string;
  }> = [
    {
      id: 1,
      name: 'Order 1',
    },
    {
      id: 2,
      name: 'Order 2',
    },
  ];

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.filter((order) => order.id === id)[0];
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    const newOrders = this.orders.filter((order) => order.id !== id);
    this.orders = newOrders;
    return {
      success: true,
    };
  }
}
