import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../types'

const JWT_SECRET = "foo"
const COOKIE_NAME = "access-token"

export const setAccessToken = (req: Request, res: Response, user: any) => {
    // Crea l'access token con JWT
    const accessToken = jwt.sign(user, JWT_SECRET, {expiresIn: "15 min"})
    // Imposta l'access token come cookie
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 900000, // 15 min in millisecondi
        httpOnly: true,
        sameSite: true,
        // secure
    })
}

export async function decodeAccessToken(req: Request, res: Response) {
    // Otteniamo il cookie dell'access token
    const accessToken = req.cookies[COOKIE_NAME]
    //Restiusce id ati dell'utente contenuto nell'access token oppure null se il token  non c'e o invalido
    if (!accessToken) return null
    try {
        const user = jwt.verify(accessToken, JWT_SECRET) as User
        return user
    } catch {
        return null
    }
}

export const deleteAccessToken = (req: Request, res: Response) => {
    // Cancella il cookie dell'access token
    res.clearCookie(COOKIE_NAME)
  }