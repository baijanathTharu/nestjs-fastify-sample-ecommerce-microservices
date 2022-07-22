import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  orders: Array<{
    id: string;
    name: string;
  }> = [];

  create(createOrderDto: CreateOrderDto) {
    const newOrder = {
      id: v4(),
      name: createOrderDto.name,
    };
    this.orders.push(newOrder);
    return {
      success: true,
    };
  }

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    return this.orders.filter((order) => order.id === id)[0];
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    const newOrders = this.orders.filter((order) => order.id !== id);
    this.orders = newOrders;
    return {
      success: true,
    };
  }
}
