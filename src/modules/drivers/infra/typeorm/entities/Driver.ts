import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import VehicleType from './VehicleType';

@Entity('drivers')
class Driver {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: 'M' | 'F' | 'Other';

  @Column()
  hasOwnVehicle: boolean;

  @Column()
  vehicleLicenseType: string;

  @Column()
  vehicleTypeId: number;

  @ManyToOne(() => VehicleType)
  @JoinColumn({ name: 'vehicleTypeId' })
  vehicleType: VehicleType;

  @Column()
  isLoaded: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Driver;
