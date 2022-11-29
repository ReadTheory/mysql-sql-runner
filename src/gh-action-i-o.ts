import core = require('@actions/core');

export interface ActionIO {
    getQueries(): string[]

    getConnectionSettings(): {
        host: string
        user: string
        password: string
        port: number
        database: string
    }

    setQueriesResults(results: string[]): void

    setError(error: any): void
}

export class GhActionIO implements ActionIO {
    private readonly queries: string[]
    private readonly connectionSettings: {
        host: string
        user: string
        password: string
        port: number
        database: string
    }

    getInput<T>(name:string, defaultVal:T):T {
        const tmp: string = core.getInput(name, {required: false})
        return tmp ? JSON.parse(tmp) : defaultVal
    }

    constructor() {

        this.queries = this.getInput("queries", ['INSERT INTO `db`.`test` (`name`, `age`) VALUES (\'fdsfd\', 3);','UPDATE `db`.`test` SET `name`=\'123\' WHERE  `name`=\'k\' AND `age`=3 LIMIT 1;'])
        this.connectionSettings = {
            host: this.getInput("host", 'localhost'),
            user: this.getInput("user", 'user'),
            password: this.getInput("password", 'password'),
            port: this.getInput("port", 3306),
            database: this.getInput("database", 'db')
        }
    }

    getConnectionSettings(): { host: string; user: string; password: string; port: number; database: string } {
        return this.connectionSettings
    }

    getQueries(): string[] {
        return this.queries;
    }

    setQueriesResults(results: string[]): void {
        results.forEach((value, index) => {
            core.setOutput(`query-result-${index}`, value)
        })
    }

    setError(error: any): void {
        core.error(error)
    }
}
