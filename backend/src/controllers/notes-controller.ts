import { Request, Response } from 'express'
import { getConnection } from '../utils/db'
import { RowDataPacket } from 'mysql2'




export async function getLastNotesID(req: Request, res: Response) {
    const connection = await getConnection()
    const results = await connection.execute(
        "SELECT idnote FROM note ORDER BY idnote DESC LIMIT 1",
    [])
    res.json(results)
    
    //return (results[0] as RowDataPacket).idnote
    
}

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

export async function createNotes(req: Request, _res: Response) {
   // getLastNotesID()
    const connection = await getConnection()
    connection.execute(
        "INSERT INTO note (idnote, titolo, categoria, autore, testo) VALUES (?, ?, ?, ?, ?)",
        [req.body, req.headers, req.body, req.body, req.body] // da finire
    )
}