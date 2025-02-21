import express, { Request } from "express"
import spotifyRouter from "./route"

const app = express()
const port = 8080

app.use(express.json())

app.use(spotifyRouter)

app.get('/', (req, res) => {
    res.json({message: "Funcionando!"}).status(200)
})

app.listen(port, () => {
    console.log('rodando', port)
})