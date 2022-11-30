import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsMethodsDTO } from 'src/payments.dto';
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
}
