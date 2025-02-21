import { Router } from "express"
import { pesquisarAlbum } from "./spotifyController"

const spotifyRouter = Router()

spotifyRouter.post('/pesquisar', pesquisarAlbum)

export default spotifyRouter