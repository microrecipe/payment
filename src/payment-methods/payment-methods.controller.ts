import { Controller, Get } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentsMethodsDTO } from '../payments.dto';

@Controller('payments/payment-methods')
export class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @Get()
  async listPaymentMethods(): Promise<PaymentsMethodsDTO[]> {
    return await this.service.listPaymentMethods();
  }
}
