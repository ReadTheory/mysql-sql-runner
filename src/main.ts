import {Connection, createConnection} from "mysql2/promise"
import {GhActionIO} from "./gh-action-i-o";

async function main(): Promise<string[]> {
    const ghActionIO = new GhActionIO()
    try {
        const connection: Connection = await createConnection(ghActionIO.getConnectionSettings());

        await connection.beginTransaction()

        const results: string[] = await Promise.all(ghActionIO.getQueries().map(async query => {
            return JSON.stringify((await connection.query(query))[0])
        }))

        await connection.commit()
        await connection.end()

        ghActionIO.setQueriesResults(results)

        return results
    } catch (error){
        ghActionIO.setError(error)
        const message = error instanceof Error ? error.message : "Unknown error."
        return [message]
    }
}

main().then(value => {
    value.forEach(v=>{console.dir(v)})
    process.exit(0)
}).catch(reason => {
    console.error(reason)
})