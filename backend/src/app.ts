import express, { Express } from 'express'
import notaRouter from './routes/notes-router'
import postRouter from './routes/post-notes-router'
import authRouter from './routes/auth-router'

const app: Express = express()
const port : number = 3000

app.use(notaRouter)
app.use(postRouter)
app.use(authRouter)

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina non trovata");
});

app.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});