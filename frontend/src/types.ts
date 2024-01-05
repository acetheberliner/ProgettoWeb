export interface Nota {
  titolo: string;
  categoria: string;
  autore: string;
  data: Date;
  testo: string;
  anteprima: string;
}

export interface User {
  id: number;
  username: string;
  role: "admin" | "user";
}
