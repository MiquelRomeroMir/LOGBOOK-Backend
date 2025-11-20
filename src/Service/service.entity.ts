import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { Business } from '../Business/business.entity';
import { Reservation } from '../Reservation/reservation.entity';

@Entity({ name: 'service' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'integer', nullable: true })
  duration_minutes?: number;

  @Column({ type: 'numeric', nullable: true })
  price?: number;

  @ManyToOne(() => Business, (business) => business.services, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @OneToMany(() => Reservation, (reservation) => reservation.service, { eager: false })
  reservations: Reservation[];
}

