import { DefaultNamingStrategy, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy {
  /**
   * Gets the table's primary key name from the given table name and column names.
   */
  primaryKeyName(tableOrName: Table | string): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `${tableName}_pkey`;
  }

  /**
   * Gets the name of the foreign key.
   */
  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `fkey_${tableName}_on_${columnNames.join('_and_')}`;
  }

  /**
   * Gets the name of the index - simple and compose index.
   */
  indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return where
      ? `index_${tableName}_on_${columnNames.join('_and_')}_${where}`
      : `index_${tableName}_on_${columnNames.join('_and_')}`;
  }

  /**
   * Gets the relation constraint (UNIQUE or UNIQUE INDEX) name from the given table name,
   * column names and WHERE condition, if UNIQUE INDEX used.
   */
  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    return this.indexName(tableOrName, columnNames, where);
  }

  /**
   * Gets the table's unique constraint name from the given table name and column names.
   */
  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    return this.indexName(tableOrName, columnNames);
  }

  /**
   * Gets the table's default constraint name from the given table name and column name.
   */
  defaultConstraintName(
    tableOrName: Table | string,
    columnName: string,
  ): string {
    return this.indexName(tableOrName, [columnName]);
  }
}
