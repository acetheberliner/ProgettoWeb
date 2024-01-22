import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { decodeAccessToken } from "../utils/auth";
import { User } from "../types";
import { parseArgs } from "util";

export async function getLastNotesID() {
  const connection = await getConnection();
  const [results]: any = await connection.execute(
    "SELECT idnote FROM note ORDER BY idnote DESC LIMIT 1",
    []
  );
  const lastID = results[0].idnote;

  return lastID;
}

export async function createPost(req: Request, res: Response) {
  const user = decodeAccessToken(req, res);

  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  try {
    const { title, category, date, text, preview } = req.body; // tolto author
  
    const connection = await getConnection();
    const newNoteID = (await getLastNotesID()) + 1;
  
    await connection.execute(
      'INSERT INTO note (idnote, titolo, categoria, data, autore, testo, anteprima) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newNoteID, title, category, date, user.username, text, preview]
    );
    res.status(201).json({ idnote: newNoteID, title, category, date, author: user.username, text, preview });
  } catch (error) {
    console.error('Errore durante la creazione della nota:', error);
    // Gestisci eventuali errori, ad esempio inviando una risposta di errore al client
    res.status(500).send('Errore durante la creazione della nota.');
  }
}

export async function deletePost(req: Request, res: Response) {
  const user: any = decodeAccessToken(req, res);
  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  const connection = await getConnection();
  const [posts] = await connection.execute(
    "SELECT * FROM note WHERE idnote = ?",
    [req.params.id]
  );

  if (!Array.isArray(posts) || posts.length == 0) {
    res.status(404).send("Post non trovato.");
    return;
  }

  const post = posts[0] as any;
  if (post.autore != user.username) {
    res.status(403).send("Non hai i permessi per eliminare questo post.");
    return;
  }

  await connection.execute("DELETE FROM note WHERE idnote = ?", [
    req.params.id,
  ]);
}
