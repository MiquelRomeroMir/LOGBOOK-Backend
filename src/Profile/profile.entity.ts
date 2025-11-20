import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Reservation } from '../Reservation/reservation.entity';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string;

  @Column({
    name: 'avatarUrl',
    type: 'varchar',
    length: 500,
    nullable: true,
    default:
      'https://altvolzamkcqwmsmxvxk.supabase.co/storage/v1/object/public/User_avatars/profile-vector.jpg',
  })
  avatarUrl?: string;

  @OneToMany(() => Reservation, (reservation) => reservation.profile)
  reservations: Reservation[];
}
