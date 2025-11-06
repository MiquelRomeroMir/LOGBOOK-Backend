import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, JoinColumn } from 'typeorm';
import { Business } from '../Business/business.entity';
import { Reservation } from '../Reservation/reservation.entity';

@Entity({name:'user'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToOne(() => Business, business => business.users, { eager: false, nullable: true })
@JoinColumn({ name: 'business_id' })
business?: Business;



  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];
}