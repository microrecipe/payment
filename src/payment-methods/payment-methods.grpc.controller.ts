import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IPaymentMethod, PaymentMethodId } from '../payments.interface';
import { PaymentMethodsGrpcService } from './payment-methods.grpc.service';

@Controller()
export class PaymentMethodsGrpcController {
  constructor(private readonly service: PaymentMethodsGrpcService) {}

  @GrpcMethod('PaymentsService')
  async getPaymentMethodById(
    paymentMethodId: PaymentMethodId,
  ): Promise<IPaymentMethod> {
    return await this.service.getPaymentMethodById(paymentMethodId.id);
  }
}
