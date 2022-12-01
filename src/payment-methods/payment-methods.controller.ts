import { Controller } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { AddPaymentMethodBody, PaymentsMethodsDTO } from '../payments.dto';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';

@Controller('payments/payment-methods')
@UseInterceptors(ClassSerializerInterceptor)
export class PaymentMethodsController {
  constructor(private readonly service: PaymentMethodsService) {}

  @Get()
  async listPaymentMethods(): Promise<PaymentsMethodsDTO[]> {
    return await this.service.listPaymentMethods();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addPaymentMethod(
    @Body() body: AddPaymentMethodBody,
  ): Promise<PaymentsMethodsDTO> {
    return await this.service.addPaymentMethod(body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePaymentMethod(@Param('id') id: number): Promise<string> {
    return await this.service.deletePaymentMethod(id);
  }
}
