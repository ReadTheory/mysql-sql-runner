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
    private getInput;
}
