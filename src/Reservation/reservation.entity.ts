import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../User/user.entity';
import { Business } from '../Business/business.entity';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  business_id: number;

  @Column({ type: 'timestamp with time zone' })
  reservation_date: Date;

  @ManyToOne(() => User, user => user.reservations, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Business, business => business.reservations, { eager: false })
  @JoinColumn({ name: 'business_id' })
  business: Business;
}
