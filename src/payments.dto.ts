import { PaymentMethods } from './payment-methods/payment-methods.entity';

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
