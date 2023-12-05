import { Request, Response } from 'express'
import { connection } from '../utils/db'

// tutte le note
export async function allNotes(req: Request, res: Response) {
    // await getConnection
    connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note",
        [],
        function (err, results, fields) {
            res.json(results);
        }
    )
}

// note per categoria
export async function notesPerCategory(req: Request, res: Response) {
    // await getConnection
    connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note WHERE categoria = ?",
        [req.params.n],
        function (err, results, fields) {
            res.json(results);
        }
    )
}