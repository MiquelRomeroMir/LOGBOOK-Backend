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

  @Column({ type: 'varchar', length: 500, nullable: true,default: 'https://altvolzamkcqwmsmxvxk.supabase.co/storage/v1/object/public/user_avatars/profile-vector.jpg'  })
  avatarUrl?: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];
}