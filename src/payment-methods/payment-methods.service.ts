import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsMethodsDTO } from 'src/payments.dto';
import { AddPaymentMethodData } from 'src/payments.interface';
import { Repository } from 'typeorm';
import { PaymentMethods } from './payment-methods.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethods)
    private readonly paymentsRepository: Repository<PaymentMethods>,
  ) {}

  async listPaymentMethods(): Promise<PaymentsMethodsDTO[]> {
    const payments = await this.paymentsRepository.find();

    return payments.map((payment) => PaymentsMethodsDTO.toDTO(payment));
  }

  async addPaymentMethod(
    data: AddPaymentMethodData,
  ): Promise<PaymentsMethodsDTO> {
    const paymentMethod = await this.paymentsRepository.save(
      this.paymentsRepository.create({
        name: data.name,
      }),
    );

    return PaymentsMethodsDTO.toDTO(paymentMethod);
  }

  async deletePaymentMethod(id: number): Promise<string> {
    const paymentMethod = await this.paymentsRepository.findOneByOrFail({ id });

    await this.paymentsRepository.remove(paymentMethod);

    return 'Payment method deleted';
  }
}
