import { Request, Response } from 'express'
import { getConnection } from '../utils/db'
import { decodeAccessToken } from '../utils/auth'

export async function getLastNotesID() {
    const connection = await getConnection()
    const results = await connection.execute(
        "SELECT idnote FROM note ORDER BY idnote DESC LIMIT 1",
    [])    
    const lastID = (results[0] as any)?.[0]?.idnote
    return lastID
}

export async function createNotes(req: Request, res: Response) {
    const user = decodeAccessToken(req, res)
    
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }
    
    const connection = await getConnection()
    connection.execute(
        "INSERT INTO note (idnote, titolo, categoria, autore, testo) VALUES (?, ?, ?, ?, ?)",
        [await getLastNotesID() + 1, req.headers, req.body, req.body, req.body] // da finire
    )
}