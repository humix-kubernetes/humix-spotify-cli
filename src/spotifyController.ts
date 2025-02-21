import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

export async function getSpotifyAuthToken(){


    if (!clientId || !clientSecret) {
        throw new Error("As credenciais do Spotify não estão definidas!");
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })

    const data = await response.json()
    return data.access_token
}

export const pesquisarAlbum = async (req: any, res: any) => {
    const { nome, banda } = req.body
    const token = await getSpotifyAuthToken()

    const response = await fetch(`https://api.spotify.com/v1/search?q=${nome}${banda}&type=album&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const data = await response.json()

    return res.status(200).json(data.albums.items[0])
}