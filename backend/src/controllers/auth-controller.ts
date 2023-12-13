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
    const { username, email, password } = req.body 
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

    await connection.execute("INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)",
    [username,
    email,
    pwdHash,
    ])

    const resutls = await connection.execute("SELECT username, email FROM utenti WHERE username = ?",
    [username])

    setAccessToken(req, res, (resutls as any)[0])
}

export async function login(req: Request, res: Response) {
    const user = await decodeAccessToken(req, res)

    if (user) {
        res.status(403).send("Questa operazione richiede il logout.")
        return
    }

    const { username, password } = req.body

    const connection = await getConnection()
    const [results] = await connection.execute(
        "SELECT username, password FROM utenti WHERE username = ?",
        [username]
    )

    // Errore se l'utente non è stato trovato
    if (!Array.isArray(results) || results.length == 0) {
        res.status(400).send("Credenziali errate.")
        return
    }

    const userData = results[0] as any

    const pwdOk = await bcrypt.compare(password, userData.password)

    if(pwdOk == false) { // o (!pwdOk)
        res.status(400).send("Credenziali errate.")
        return
    }
    // RIMUOVE la pass dall'oggetto utente
    delete userData.password

    setAccessToken(req, res, userData)
}

export async function logout(req: Request, res: Response) {
    const user = decodeAccessToken(req, res)

    if(!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    deleteAccessToken(req, res)
    
}

export async function getProfile(req: Request, res: Response) {
    const user = decodeAccessToken(req, res)
    res.json(user)
}