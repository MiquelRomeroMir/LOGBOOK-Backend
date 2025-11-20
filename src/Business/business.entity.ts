import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../Profile/profile.entity';
import { Reservation } from '../Reservation/reservation.entity';
import { Category } from '../Category/category.entity';
import { Service } from '../Service/service.entity';

@Entity({ name: 'business' })
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  business_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Category, (category) => category.businesses, { eager: true, nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @OneToMany(() => Reservation, reservation => reservation.business_id, { eager: false })
  reservations: Reservation[];

  @OneToMany(() => Service, (service) => service.business, { eager: false })
  services: Service[];

   @Column("text", { array: true, nullable: true })
  images?: string[];
}
