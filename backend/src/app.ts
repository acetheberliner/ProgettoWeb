import express, { Express } from 'express'
import notaRouter from './routes/nota-router'

const app: Express = express()
const port : number = 3000

app.use(notaRouter)

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina non trovata");
});

app.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});