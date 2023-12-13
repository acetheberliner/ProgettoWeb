import { Request, Response } from 'express'
import { getConnection } from '../utils/db'


// tutte le note
export async function allNotes(req: Request, res: Response) {
    const connection = await getConnection()
    const [results] = await connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note",
        []
    )

    res.json(results)
}

// note per categoria
export async function notesCategory(req: Request, res: Response) {
    const connection = await getConnection()
    const [results] = await connection.execute(
        "SELECT titolo, categoria, autore, testo FROM note WHERE categoria = ?",
        [req.params.n]
    )
    res.json(results)
}