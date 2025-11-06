import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { User } from '../User/user.entity';
import { Reservation } from '../Reservation/reservation.entity';

@Entity({ name: 'business' })
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  business_id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => User, user => user.business, { eager: false })
  users: User[];

  @OneToMany(() => Reservation, reservation => reservation.business, { eager: false })
  reservations: Reservation[];
}
