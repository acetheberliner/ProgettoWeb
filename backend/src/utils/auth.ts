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

