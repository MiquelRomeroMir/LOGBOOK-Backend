import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany } from 'typeorm';
import { Business } from '../Business/business.entity';

@Entity({ name: 'service' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'numeric' })
  price: number;

  @ManyToOne(() => Business, (business) => business.services, { eager: true })
  @JoinColumn({ name: 'business_id' })
  business: Business;

}
