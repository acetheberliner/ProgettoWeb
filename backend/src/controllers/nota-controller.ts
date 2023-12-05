import { Request, Response } from 'express'
import { connection } from '../utils/db'

export async function nota(req: Request, res: Response) {
    // await getConnection
    connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note",
        [],
        function (err, results, fields) {
            res.json(results);
        }
    )
}