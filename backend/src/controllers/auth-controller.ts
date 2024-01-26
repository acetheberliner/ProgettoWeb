import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  decodeAccessToken,
  deleteAccessToken,
  setAccessToken,
} from "../utils/auth";
import { getConnection } from "../utils/db";

/* ----------------------------------------------------------------------------------------------------------------------------- */

export const register = async (req: Request, res: Response) => {
  // Blocca la richiesta se l'utente ha già effettuato il login

  const user = decodeAccessToken(req, res);
  if (user) {
    res.status(403).send("Questa operazione richiede il logout");
    return;
  }

  //Prendiamo username e pwd
  const { username, password } = req.body;

  //Verifichiamo che l'username non sia usato
  const connection = await getConnection();
  const [users] = await connection.execute(
    "SELECT username FROM utenti WHERE username=?",
    [username]
  );

  if (Array.isArray(users) && users.length > 0) {
    res.status(400).send("Username già in uso");
    return;
  }

  //cript della password per l'archiviazione
  const pwdHash = await bcrypt.hash(password, 10);

  //inserimento utente nel db
  await connection.execute(
    "INSERT INTO utenti (username, password) VALUES (?, ?)",
    [username, pwdHash]
  );

  //caso nuovo utente
  const [results] = await connection.execute(
    "SELECT username, password, role FROM utenti WHERE username=?",
    [username]
  );
  const newUser = (results as any)[0];
  //creazione cookie
  setAccessToken(req, res, newUser);
  res.json({ message: "Registrazione effettuata con successo" });
};

/* ----------------------------------------------------------------------------------------------------------------------------- */

export const login = async (req: Request, res: Response) => {
  //caso login gia effettuato
  const user = decodeAccessToken(req, res);
  if (user) {
    res.status(403).send("Questa operazione richiede il logout.");
    return;
  }

  const { username, password } = req.body;

  //cerca nel db user e pass
  const connection = await getConnection();
  const [results] = await connection.execute(
    "SELECT username, password, role FROM utenti WHERE username=?",
    [username]
  );

  // Errore se l'utente non è stato trovato
  if (!Array.isArray(results) || results.length == 0) {
    res.status(400).send("Profilo inesistente.");
    return;
  }

  const userData = results[0] as any;

  //controllo tra l'hash fornito e quello del db
  const pwdOk = await bcrypt.compare(password, userData.password);

  if (pwdOk == true) {
    // o (!pwdOk)
    res.status(400).send("Credenziali errate.");
    return;
  }
  // RIMUOVE la pass dall'oggetto utente per la sicurezza
  delete userData.password;

  setAccessToken(req, res, userData);
  res.json({ message: "Login effettuato con successo" });
};

/* ----------------------------------------------------------------------------------------------------------------------------- */

export const logout = async (req: Request, res: Response) => {
  //verifica presenza di precedente login
  const user = decodeAccessToken(req, res);
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  deleteAccessToken(req, res);
  res.json({ message: "Logout effettuato con successo" });
};

/* ----------------------------------------------------------------------------------------------------------------------------- */

export const getProfile = async (req: Request, res: Response) => {
  //decodifica del token
  const user = decodeAccessToken(req, res);
  res.json(user);
};

// export const setMod = async (req: Request, res: Response) => {
//   const user = decodeAccessToken(req, res);
 
//   if (!user) {
//     res.status(403).send("Questa operazione richiede l'autenticazione.");
//     return;
//   }

//   const { username} = req.body;

//   const connection = await getConnection();

//   await connection.execute(
//     "UPDATE utenti SET role = 'mod' WHERE username = ? ",
//     [username]
//   );
// }
