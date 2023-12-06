import { Request, Response } from 'express'
import { connection } from '../utils/db'
import { RowDataPacket } from 'mysql2'

let lastID: number = 0

export async function getLastNotesID(req: Request, res: Response) {
    connection.execute<RowDataPacket[]>(
        "SELECT idnote FROM note ORDER BY idnote DESC LIMIT 1",
        [],
        function (err, results, fields) {
            res.json(results)
            if (results && results.length > 0 && 'idnote' in results[0]) {
                lastID = results[0].idnote
            }
        }
    )
}

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

export async function createNotes(req: Request, res: Response) {
   // getLastNotesID()
    connection.execute(
        "INSERT INTO note (idnote, titolo, categoria, autore, testo) VALUES (?, ?, ?, ?, ?)",
        [lastID+1, req.headers, req.body, req.body, req.body] // da finire
    )
}