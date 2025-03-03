-- Adminer 4.8.1 PostgreSQL 16.4 (Debian 16.4-1.pgdg120+1) dump

\connect "book_clients";

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
('Книга для детей',	2001,	'Книга',	'Я',	2,	NULL);

-- 2024-08-26 20:21:52.242494+00