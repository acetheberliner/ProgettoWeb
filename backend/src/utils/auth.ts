import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../types'

const JWT_SECRET = "foo"
const COOKIE_NAME = "access-token"


export const setAccessToken = (req: Request, res: Response, user: any) => {
  // Crea l'access token con JWT
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
  // Imposta l'access token come cookie
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 86400000, // 1 giorno in millisecondi
    httpOnly: true,
    sameSite: true,
    // secure: true
  })
}


export const decodeAccessToken = (req: Request, res: Response) => {
  // Ottiene il cookie dell'access token
  const accessToken = req.cookies[COOKIE_NAME]
  // Restituisce i dati dell'utente contenuti nell'access token, oppure null se il token è mancante o invalido
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
