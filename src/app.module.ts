import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Payment } from './entities/payment.entity';
import { JwtStrategy } from './jwt.strategy';
import { PaymentMethodsController } from './payment-methods/payment-methods.controller';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';
import { ClientPackageNames } from './payments.enum';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: ClientPackageNames.paymentPaidTopic,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'microrecipe',
            brokers: process.env.KAFKA_BROKERS.split(','),
          },
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PAYMENT_DB_HOST'),
        port: Number(configService.get('PAYMENT_DB_PORT')),
        username: configService.get('PAYMENT_DB_USERNAME'),
        password: configService.get('PAYMENT_DB_PASSWORD'),
        database: configService.get('PAYMENT_DB_NAME'),
        entities: [__dirname + './**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([PaymentMethod, Payment]),
  ],
  controllers: [PaymentMethodsController, PaymentsController],
  providers: [PaymentMethodsService, JwtStrategy, PaymentsService],
})
export class AppModule {}
