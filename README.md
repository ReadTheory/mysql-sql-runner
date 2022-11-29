# MySql SQL Query  Runner GitHub Action

---

This GitHub Action sets up a connection to MySQL and runs given queries.

It is based on mysql2 npm library and returns query results as JSON.

# Github Action Inputs

---

| input   | type   | default |
|---------|--------|---------|
| queries | array  | []      |
| user    | string | user    |
| password    | string | password    |
| port    | number | 3306    |
| database    | string | db    |


## Example Usage

---

```yaml
name: MySql SQL Query  Runner GitHub Action Example
on:
  workflow_dispatch:

jobs:
  find_folders_job:
    runs-on: ubuntu-latest
    steps:
      - uses: ReadTheory/mysql-sql-runner@v1
        id: mysql-sql-runner
        with:
          queries: ['INSERT INTO `db`.`test` (`name`, `age`) VALUES (\'fdsfd\', 3);','UPDATE `db`.`test` SET `name`=\'123\' WHERE  `name`=\'k\' AND `age`=3 LIMIT 1;']
          host: localhost
          user: user
          password: password
          port: 3306
          database: db

      - name: 'Results output'
        run: |
          echo "${{ steps.mysql-sql-runner.outputs.query-result-1 }}"
          echo "${{ steps.mysql-sql-runner.outputs.query-result-2 }}"
```
