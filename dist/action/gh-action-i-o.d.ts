export interface ActionIO {
    getQueries(): string[];
    getConnectionSettings(): {
        host: string;
        user: string;
        password: string;
        port: number;
        database: string;
    };
    setQueriesResults(results: string[]): void;
    setError(error: any): void;
}
export declare class GhActionIO implements ActionIO {
    private readonly queries;
    private readonly connectionSettings;
    getInput<T>(name: string, defaultVal: T): T;
    constructor();
    getConnectionSettings(): {
        host: string;
        user: string;
        password: string;
        port: number;
        database: string;
    };
    getQueries(): string[];
    setQueriesResults(results: string[]): void;
    setError(error: any): void;
}
