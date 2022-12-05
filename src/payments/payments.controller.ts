import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TopicNames } from '../payments.enum';
import { OrderPlacedPayload } from '../payments.interface';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @EventPattern(TopicNames.orderPlaced)
  async handleOrderPlaced(
    @Payload() message: OrderPlacedPayload,
  ): Promise<void> {
    return await this.service.handleOrderPlaced(message);
  }
}
