import { Controller, Get, Post } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { AddPaymentMethodBody, PaymentsMethodsDTO } from '../payments.dto';
import { Body } from '@nestjs/common/decorators';

@Controller('payments/payment-methods')
export class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @Get()
  async listPaymentMethods(): Promise<PaymentsMethodsDTO[]> {
    return await this.service.listPaymentMethods();
  }

  @Post()
  async addPaymentMethod(
    @Body() body: AddPaymentMethodBody,
  ): Promise<PaymentsMethodsDTO> {
    return await this.service.addPaymentMethod(body);
  }
}
