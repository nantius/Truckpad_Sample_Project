import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Driver from '@modules/drivers/infra/typeorm/entities/Driver';
import Location from '@modules/trips/infra/typeorm/entities/Location';

@Entity('trips')
class Trip {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  driverId: string;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @Column()
  startLocationId: string;

  @ManyToOne(() => Location, location => location.tripsAsOrigin)
  @JoinColumn({ name: 'startLocationId' })
  startLocation: Location;

  @Column()
  endLocationId: string;

  @ManyToOne(() => Location, location => location.tripsAsDestination)
  @JoinColumn({ name: 'endLocationId' })
  endLocation: Location;

  @Column()
  startDateTime: Date;

  @Column({ nullable: true })
  endDateTime: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Trip;
