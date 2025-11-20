import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Profile } from '../Profile/profile.entity';
import { Business } from '../Business/business.entity';
import { Service } from '../Service/service.entity';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  reservation_id: number;
  
  @ManyToOne(() => Business, (business) => business.reservations, { eager: false })
  @JoinColumn({ name: 'business_id' })
  business_id: Business;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Service, (service) => service.reservations, { eager: false })
  @JoinColumn({ name: 'service_id' })
  service_id: Service;

  @Column({ type: 'timestamp with time zone' })
  reservation_date: Date;

  @ManyToOne(() => Profile, (profile) => profile.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
