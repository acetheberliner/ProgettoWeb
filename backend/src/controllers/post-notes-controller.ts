import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { decodeAccessToken } from "../utils/auth";
import { User } from "../types";
import { parseArgs } from "util";
/* ------------------------------------------------------------------------------------------------------------------- */

export async function getLastNotesID() {
  const connection = await getConnection();
  const [results]: any = await connection.execute(
    "SELECT idnote FROM note ORDER BY idnote DESC LIMIT 1",
    []
  );
  const lastID = results[0].idnote;

  return lastID;
}

async function dateToString() {
  const data = new Date();
  const date: string = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
  return date
}
/* ------------------------------------------------------------------------------------------------------------------- */

export async function createPost(req: Request, res: Response) {
  const user = decodeAccessToken(req, res);

  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  try {
    const date = await dateToString();

    const { title, category, text } = req.body; // tolto author e data
    // preview piuttosto che mandarlo con axios lo crerei qua con const preview = 'qua metterei una funzione che mi accorci text'  
    const connection = await getConnection();
    const newNoteID = (await getLastNotesID()) + 1;
  
    await connection.execute(
      'INSERT INTO note (idnote, titolo, categoria, data, autore, testo) VALUES (?, ?, ?, ?, ?, ?)',
      [newNoteID, title, category, date, user.username, text]
    );
    res.status(201).json({ idnote: newNoteID, title, category, date, author: user.username, text });
  } catch (error) {
    console.error('Errore durante la creazione della nota:', error);
    // Gestisci eventuali errori, ad esempio inviando una risposta di errore al client
    res.status(500).send('Errore durante la creazione della nota.');
  }
}
/* ------------------------------------------------------------------------------------------------------------------- */

export async function deletePost(req: Request, res: Response) {
  const user: any = decodeAccessToken(req, res);

  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }

  try {
    const connection = await getConnection();
    
    const [posts] = await connection.execute(
      "SELECT * FROM note WHERE idnote = ?",
      [req.params.id]
    );

    if (!Array.isArray(posts) || posts.length == 0) {
      res.status(404).send("Nota non trovata.");
      return;
    }

    const post = posts[0] as any;
    
    if (post.autore == user.username || user.role == "mod") {
      await connection.execute("DELETE FROM note WHERE idnote = ?", [req.params.id]);
      res.status(200).send("Nota eliminata con successo.");
    } else {
      res.status(403).send("Non hai i permessi per eliminare questa nota.");
      return;
    }
    
  } catch (error) {
    console.error("Errore durante l'eliminazione della nota:", error);
    res.status(500).send("Errore interno del server durante l'eliminazione della nota.");
  }
}
/* ------------------------------------------------------------------------------------------------------------------- */

export async function editPost(req: Request, res: Response) {
  const user: any = decodeAccessToken(req, res);

  if (!user) {
    res.status(403).send("Questa operazione richiede l'autenticazione.");
    return;
  }
  const { idnote, title, text, category} = req.body;

  try {
    const connection = await getConnection();
    const [posts] = await connection.execute("SELECT * FROM note WHERE idnote = ?",
    [idnote]
    );

    if (!Array.isArray(posts) || posts.length == 0) {
      res.status(404).send("Nota non trovata.");
      return;
    }
    const date = await dateToString();

    await connection.execute("UPDATE note SET titolo = ?, categoria = ?, data = ?, testo = ?, stato ='da approvare' WHERE idnote = ?",
    [title, category, date, text, idnote]
    );

  } catch(e) {
    res.status(500).send("Errore interno del server durante l'update della nota.");
    console.log("Errore: ", e);
  }
}
/* ------------------------------------------------------------------------------------------------------------------- */

export async function updateState(req: Request, res: Response) {
  const {idnote, state, comment} = req.body

  try{
    const connection = await getConnection();
    await connection.execute("UPDATE note SET stato = ?, commento = ? WHERE idnote = ?",
      [state, comment, idnote]
    );
  } catch(e) {
    res.status(500).send("Errore interno del server durante l'update dello stato.");
    console.log("Errore: ", e);
  }
  
}