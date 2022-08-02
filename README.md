# TypeORM mapping test

## Steps to run

**Setup local tools**
- Install Node version 14.17.0 with NPM version 6.14.13;
- Run `npm install`.

**Create the database**
```shell
docker run \
  --name mytestdb \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=mytestdb \
  -e POSTGRES_USER=mytestdb \
  -e POSTGRES_DB=mytestdb \
  -d postgres:13
```

**Run the initial structure script (password is mytestdb)**
```shell
psql -h localhost -U mytestdb -d mytestdb -a -f initial.sql
```

**Generate the migrations**
```shell
npm run migration:generate ./migrations/automigration
```