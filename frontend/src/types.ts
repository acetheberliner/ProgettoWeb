export interface Nota {
  idnote: number
  titolo: string
  categoria: string
  autore: string
  data: string
  testo: string
  stato: string
  commento: string
}

export interface User {
  username: string
  password: string
  role: "mod" | "user"
}
