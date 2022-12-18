import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, TextField} from '@mui/material';

function App() {
  const CLIENT_ID = "2fd84f198e434f5db707ba50f8d4af3f"
  const REDIRECT_URI = "http://localhost:3000/abstractify"
  //const REDIRECT_URI = "https://theozhangg.github.io/abstractify/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>abstractify</h1>
        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : <Button onClick={logout} variant="contained">Logout</Button>}

        <TextField onChange={e => setSearchKey(e.target.value)}/>
        <Button onClick={searchArtists} variant="contained">Search</Button>
        {renderArtists()}
      </header>
    </div>
  );
}

export default App;
