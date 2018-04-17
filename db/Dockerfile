FROM postgres

ADD create_db.sql /docker-entrypoint-initdb.d/0_create_db.sql
ADD schema.sql /docker-entrypoint-initdb.d/1_schema.sql
ADD variables.sql /variables.sql

VOLUME ["/var/lib/postgresql/data"]
