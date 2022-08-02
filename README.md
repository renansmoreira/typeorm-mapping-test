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

**Result**

After generating the migration, I got this output:
```js
await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "fkey_tags_on_community_id" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

await queryRunner.query(`ALTER TABLE "communities" ADD CONSTRAINT "fkey_communities_on_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
```

Which is the same if compared to my `initial.sql` file
```sql
-- SQL from TypeORM migration
ALTER TABLE
    "tags"
ADD
    CONSTRAINT "fkey_tags_on_community_id" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION

ALTER TABLE 
    "communities"
ADD
    CONSTRAINT "fkey_communities_on_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION

-- SQL from my initial.sql file
ALTER TABLE
    "tags"
ADD
    CONSTRAINT "fkey_tags_on_community_id" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
    "communities"
ADD
    CONSTRAINT "fkey_communities_on_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;