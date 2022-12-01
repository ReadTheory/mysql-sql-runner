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
        core.setOutput(`queries-results`, results)
    }

    setError(error: any): void {
        core.setFailed(`Action failed with error ${error}`);
    }

    private getInput<T>(name: string, defaultVal: T): T {
        try {
            switch (typeof defaultVal) {
                case "string":
                    return core.getInput(name, {required: false}) as T || defaultVal
                case "number":
                    return Number(core.getInput(name, {required: false})) as T || defaultVal
                case "boolean":
                    return core.getBooleanInput(name, {required: false}) as T || defaultVal
                default:
                    return core.getMultilineInput(name, {required: false}) as T || defaultVal
            }
        } catch (error) {
            throw {
                message: `Failed to parse input: ${name}`,
                cause: error
            }
        }
    }
}