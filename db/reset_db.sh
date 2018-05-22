SCHEMA=test
DUMP_FILE="data.sql"
SCHEMA_FILE="schema.sql"

pg_dump utensil -a -f $DUMP_FILE -n $SCHEMA

psql -d utensil -f $SCHEMA_FILE
psql -d utensil -f $DUMP_FILE

