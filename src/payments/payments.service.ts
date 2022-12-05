import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { OrderPlacedPayload, PaymentPaidPayload } from 'src/payments.interface';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';
import { ClientPackageNames, TopicNames } from '../payments.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(ClientPackageNames.paymentPaidTopic)
    private paymentPaidTopic: ClientKafka,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  private async simulateSuccessfulPayment(
    paymentId: number,
    data: OrderPlacedPayload,
  ): Promise<void> {
    const payment = await this.paymentsRepository.findOneByOrFail({
      id: paymentId,
    });

    payment.paymentStatus = 'paid';

    await this.paymentsRepository.save(payment);

    this.paymentPaidTopic.emit<any, PaymentPaidPayload>(
      TopicNames.paymentPaid,
      {
        paymentId: payment.id,
        order: data,
        timestamp: payment.updatedAt,
      },
    );

    return;
  }

  async handleOrderPlaced(data: OrderPlacedPayload): Promise<void> {
    const paymentMethod = await this.paymentMethodRepository.findOneByOrFail({
      id: data.paymentId,
    });

    const payment = await this.paymentsRepository.save(
      this.paymentsRepository.create({
        totalPrice:
          data.cartItems
            .map((item) => item.price * item.quantity)
            .reduce((a, b) => a + b, 0) + data.courier.shippingCost,
        paymentMethod,
        userId: data.userId,
        orderId: data.orderId,
        paymentStatus: null,
      }),
    );

    setTimeout(() => {
      this.simulateSuccessfulPayment(payment.id, data);
    }, 5000);

    return;
  }
}
