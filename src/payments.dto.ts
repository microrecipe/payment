import { IsString } from 'class-validator';
import { PaymentMethods } from './payment-methods/payment-methods.entity';
import { AddPaymentMethodData } from './payments.interface';

export class PaymentsMethodsDTO {
  static toDTO(paymentMethods: PaymentMethods) {
    const res = new PaymentsMethodsDTO();

    res.id = paymentMethods.id;
    res.name = paymentMethods.name;

    return res;
  }

  id: number;
  name: string;
}

export class AddPaymentMethodBody implements AddPaymentMethodData {
  @IsString()
  name: string;
}
