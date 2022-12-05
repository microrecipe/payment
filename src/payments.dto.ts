import { IsString } from 'class-validator';
import { PaymentMethod } from './entities/payment-method.entity';
import { AddPaymentMethodData } from './payments.interface';

export class PaymentsMethodsDTO {
  static toDTO(paymentMethods: PaymentMethod) {
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
