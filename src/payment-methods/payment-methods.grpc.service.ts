import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';
import { IPaymentMethod } from '../payments.interface';

@Injectable()
export class PaymentMethodsGrpcService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
  ) {}

  async getPaymentMethodById(id: number): Promise<IPaymentMethod> {
    return await this.paymentMethodsRepository.findOneByOrFail({
      id,
    });
  }
}
