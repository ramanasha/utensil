FROM postgres

ADD schema.sql /docker-entrypoint-initdb.d/0_schema.sql

VOLUME ["/var/lib/postgresql/data"]
