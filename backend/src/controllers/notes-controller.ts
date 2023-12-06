import { Request, Response } from 'express'
import { connection } from '../utils/db'

// tutte le note
export async function allNotes(req: Request, res: Response) {
    connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note",
        [],
        function (err, results, fields) {
            res.json(results);
        }
    )
}

// note per categoria
export async function notesCategory(req: Request, res: Response) {
    connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note WHERE categoria = ?",
        [req.params.n],
        function (err, results, fields) {
            res.json(results);
        }
    )
}

export async function createNotes() {
    
}