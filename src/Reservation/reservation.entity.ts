import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../User/user.entity';
import { Business } from '../Business/business.entity';
import { Service } from '../Service/service.entity';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  reservation_id: number;
  
  @ManyToOne(() => Business, (business) => business.reservations, { eager: false })
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @ManyToOne(() => Service, (service) => service.reservations, { eager: false })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'timestamp with time zone' })
  reservation_date: Date;

  @ManyToOne(() => User, user => user.reservations, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
