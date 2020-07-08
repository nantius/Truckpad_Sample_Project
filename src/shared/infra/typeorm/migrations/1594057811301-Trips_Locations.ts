/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export default class TripsLocations1594057811301 implements MigrationInterface {
    name = 'TripsLocations1594057811301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4502fed5768cbd4548f5c8b76e8" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "trips" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "driverId" uuid NOT NULL, "startLocationId" uuid NOT NULL, "endLocationId" uuid NOT NULL, "startDateTime" TIMESTAMP NOT NULL, "endDateTime" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c80a4dd27beefb4c5b658a99112" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "trips" ADD CONSTRAINT "FK_fc5a8911f85074a660a4304baa1" FOREIGN KEY ("driverId") REFERENCES "drivers"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trips" ADD CONSTRAINT "FK_806ed5dc24a30fe690f576952fc" FOREIGN KEY ("startLocationId") REFERENCES "locations"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trips" ADD CONSTRAINT "FK_41ee16a5658cf44d672457c574d" FOREIGN KEY ("endLocationId") REFERENCES "locations"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_41ee16a5658cf44d672457c574d"`);
        await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_806ed5dc24a30fe690f576952fc"`);
        await queryRunner.query(`ALTER TABLE "trips" DROP CONSTRAINT "FK_fc5a8911f85074a660a4304baa1"`);
        await queryRunner.query(`DROP TABLE "trips"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
