import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

export type PaymentStatus = 'paid';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'total_price',
    type: 'float',
    nullable: true,
  })
  totalPrice: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: true,
  })
  userId: number;

  @ManyToOne(() => PaymentMethod, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @Column({
    name: 'order_id',
    type: 'int',
    nullable: true,
  })
  orderId: number;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: ['paid'],
    nullable: true,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
