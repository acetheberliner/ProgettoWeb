import express from "express";
import history from "connect-history-api-fallback";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import notaRouter from "./routes/notes-router";
import postRouter from "./routes/post-notes-router";
import authRouter from "./routes/auth-router";

const app = express();

app.use(history());

app.use(bodyParser.json());
app.use(cookieParser());

app.use(notaRouter);
app.use(postRouter);
app.use(authRouter);

app.use(history());
app.use(express.static("dist-frontend"));

app.use((_, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Ops... Pagina non trovata");
});

const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
