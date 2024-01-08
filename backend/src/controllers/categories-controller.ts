import { Request, Response } from "express";
import { getConnection } from "../utils/db";

//categorie di note
export async function allCategories(req: Request, res: Response) {
  const connection = await getConnection();
  const [results] = await connection.execute(
    "SELECT DISTINCT categoria FROM note ",
    []
  );
  res.json(results);
}
