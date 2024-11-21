const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrations1732083667351 {
    name = 'Migrations1732083667351'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "username" varchar(100) NOT NULL, "password" varchar(255) NOT NULL, "isActive" bool NOT NULL DEFAULT true, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entries" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "title" varchar(100) NOT NULL, "userId" varchar(255) NOT NULL, "description" varchar(255) NOT NULL, "videoUrl" varchar NOT NULL DEFAULT true, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "text" varchar(100) NOT NULL, "userId" varchar(255) NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "entryId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8e0675f6a30170ab1da05102b" ON "comments" ("entryId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_a8e0675f6a30170ab1da05102bf" FOREIGN KEY ("entryId") REFERENCES "entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_a8e0675f6a30170ab1da05102bf"`);
        await queryRunner.query(`DROP INDEX "comments"@"IDX_a8e0675f6a30170ab1da05102b" CASCADE`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "entries"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
