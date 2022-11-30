import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_methods')
export class PaymentMethods {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
  })
  name: string;
}
