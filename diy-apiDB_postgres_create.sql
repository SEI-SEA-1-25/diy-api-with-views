CREATE TABLE "countries" (
   "id" serial NOT NULL,
   "name" text NOT NULL,
   "belongs_to" text NOT NULL,
   "updatedAt" integer NOT NULL,
   "createdAt" integer NOT NULL,
   CONSTRAINT "countries_pk" PRIMARY KEY ("id", "name")
)
WITH (
   OIDS = FALSE
);

CREATE TABLE "continents" (
   "id" serial NOT NULL,
   "country_id" serial NOT NULL,
   "contnt_name" serial NOT NULL UNIQUE,
   "updatedAt" integer NOT NULL,
   "createdAt" integer NOT NULL,
   CONSTRAINT "continents_pk" PRIMARY KEY ("id", "contnt_name")
)
WITH (
   OIDS = FALSE
);

ALTER TABLE "countries"
   ADD CONSTRAINT "countries_fk0" FOREIGN KEY ("belongs_to") REFERENCES "continents" ("contnt_name");

ALTER TABLE "continents"
   ADD CONSTRAINT "continents_fk0" FOREIGN KEY ("country_id") REFERENCES "countries" ("id");

