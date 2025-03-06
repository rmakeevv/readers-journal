-- Adminer 4.17.1 PostgreSQL 17.4 (Debian 17.4-1.pgdg120+2) dump

\connect "book_clients";

DROP TABLE IF EXISTS "books";
DROP SEQUENCE IF EXISTS books_id_seq;
CREATE SEQUENCE books_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."books" (
    "name" character varying(150),
    "year" integer,
    "genre" character varying(150),
    "author" character varying(150),
    "id" integer DEFAULT nextval('books_id_seq') NOT NULL,
    "instock" integer,
    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "books" ("name", "year", "genre", "author", "id", "instock") VALUES
('My book',	2004,	'genre',	'author',	1,	5),
('Книга для детей',	2001,	'Книга',	'Я',	2,	NULL),
('23',	23,	'32',	'32',	4,	NULL),
('2',	2,	'3',	'4',	5,	NULL);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;

CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying NOT NULL,
    "last_name" character varying NOT NULL,
    "role" character varying NOT NULL,
    "email" character varying NOT NULL
) WITH (oids = false);


-- 2025-03-06 15:54:33.924502+00
