import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { decodeAccessToken, deleteAccessToken, setAccessToken } from '../utils/auth'
import { getConnection } from '../utils/db'



export async function register(req: Request, res: Response) {
    // Blocca la richiesta se l'utente ha già effettuato il login
    
    const user = await decodeAccessToken(req, res)
    if (user) {
        res.status(403).send("Questa operazione richiede il logout")
        return
    }
    //Prendiamo username e pwd
    //const { username, passoword } = req.body
    const username = "guido.mosconi"
    const password = ""
    const nome = "Guido"
    //Verifichiamo che l'username non sia usato
    
    const connection = await getConnection()
    const [users] = await connection.execute("SELECT username FROM users WHERE username=?", [
        username,
    ])

    if (Array.isArray(users) && users.length > 0) {
        res.status(400).send("Username già in uso")
        return
    }

    const pwdHash = await bcrypt.hash(password, 10)

    await connection.execute("INSERT INTO utenti (username, nome, password) VALUES (?, ?, ?)",
    [username,
    nome,
    pwdHash,
    ])

    const resutls = await connection.execute("SELECT username, nome FROM utenti WHERE username = ?",
    [username])

    setAccessToken(req, res, (resutls as any)[0])
}