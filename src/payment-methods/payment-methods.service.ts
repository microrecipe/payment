import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/entities/payment-method.entity';
import { PaymentsMethodsDTO } from 'src/payments.dto';
import { AddPaymentMethodData } from 'src/payments.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentsRepository: Repository<PaymentMethod>,
  ) {}

  async listPaymentMethods(): Promise<PaymentsMethodsDTO[]> {
    const paymentMethods = await this.paymentsRepository.find();

    return paymentMethods.map((payment) => PaymentsMethodsDTO.toDTO(payment));
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

    await this.paymentsRepository.softRemove(paymentMethod);

    return 'Payment method deleted';
  }
}
