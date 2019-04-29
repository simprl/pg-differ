exports.getConstraints = (table) => `
select
  conname as name,
  c.contype as type,
  pg_catalog.pg_get_constraintdef(c.oid, true) as definition
from pg_catalog.pg_constraint as c
  where c.conrelid = '${table}'::regclass order by 1
`

exports.getColumns = (schema, table) => `
select
  pg_catalog.format_type(c.atttypid, c.atttypmod) as data_type,
  ic.collation_name,
  ic.column_default,
  ic.is_nullable,
  ic.column_name
from pg_attribute c
join pg_class t on c.attrelid = t.oid
join pg_namespace n on t.relnamespace = n.oid
join information_schema.columns ic
  on c.attname = ic.column_name
  and t.relname = ic.table_name
  and n.nspname = ic.table_schema
where n.nspname = '${schema}'
  and t.relname = '${table}';
`

exports.getIndexes = (schema, table) => `
select
  indexname as name,
  indexdef as definition
from pg_indexes as i
where schemaname = '${schema}'
  and tablename = '${table}'
  and indexname not in (select conname from pg_catalog.pg_constraint)
`

exports.tableExist = (schema, table) => `
select exists (
  select 1 from pg_tables
    where schemaname = '${schema}'
    and tablename = '${table}'
)
`
