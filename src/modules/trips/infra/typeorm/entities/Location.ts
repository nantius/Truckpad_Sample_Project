import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Trip from './Trip';

@Entity('locations')
class Location {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToMany(() => Trip, trip => trip.startLocation)
  tripsAsOrigin: Trip[];

  @OneToMany(() => Trip, trip => trip.endLocation)
  tripsAsDestination: Trip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Location;
