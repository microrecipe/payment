import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { PaymentMethodsController } from './payment-methods/payment-methods.controller';
import { PaymentMethods } from './payment-methods/payment-methods.entity';
import { PaymentMethodsService } from './payment-methods/payment-methods.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    TypeOrmModule.forFeature([PaymentMethods]),
  ],
  controllers: [PaymentMethodsController],
  providers: [PaymentMethodsService, JwtStrategy],
})
export class AppModule {}
