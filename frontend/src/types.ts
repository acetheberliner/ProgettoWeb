export interface Nota {
  id: number;
  titolo: string;
  categoria: string;
  autore: string;
  data: Date;
  testo: string;
  anteprima: string;
}

export interface User {
  username: string;
  password: string;
}
