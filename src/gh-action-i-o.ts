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

    getConnectionSettings(): { host: string; user: string; password: string; port: number; database: string } {
            return {
                host: this.getInput("host", 'localhost'),
                user: this.getInput("user", 'user'),
                password: this.getInput("password", 'password'),
                port: this.getInput("port", 3306),
                database: this.getInput("database", 'db')
            }
    }

    getQueries(): string[] {
        return this.getInput("queries", []);
    }

    setQueriesResults(results: string[]): void {
        results.forEach((value, index) => {
            core.setOutput(`query-result-${index}`, value)
        })
    }

    setError(error: any): void {
        core.error(error)
    }

    private getInput<T>(name:string, defaultVal:T):T {
        try {
            const tmp: string = core.getInput(name, {required: false})
            switch (typeof defaultVal) {
                case "string":
                    return tmp as T
                case "number":
                    return Number(tmp) as T
                default:
                    return JSON.parse(tmp)
            }
        } catch (error) {
            throw {
                message: `Failed to parse input: ${name}`,
                cause: error
            }
        }
    }
}