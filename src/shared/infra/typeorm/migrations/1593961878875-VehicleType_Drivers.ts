/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export default class VehicleTypeDrivers1593961878875 implements MigrationInterface {
    name = 'VehicleTypeDrivers1593961878875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle_types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_73d1e40f4add7f4f6947acad3a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "sex" character varying NOT NULL, "hasOwnVehicle" boolean NOT NULL, "vehicleLicenseType" character varying NOT NULL, "vehicleTypeId" integer NOT NULL, "isLoaded" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc9964e9746a9a181d749ccd812" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD CONSTRAINT "FK_0d8f564aba07dc92aab31dbf0e2" FOREIGN KEY ("vehicleTypeId") REFERENCES "vehicle_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP CONSTRAINT "FK_0d8f564aba07dc92aab31dbf0e2"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "vehicle_types"`);
    }

}
