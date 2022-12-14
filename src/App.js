import './App.css';
import {useEffect, useState} from 'react';


function App() {
  const CLIENT_ID = "2fd84f198e434f5db707ba50f8d4af3f"
  const REDIRECT_URI = "http://localhost:3000/abstractify"
  //const REDIRECT_URI = "https://theozhangg.github.io/abstractify/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ?
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
            : <button onClick={logout}>Logout</button>}
      </header>
    </div>
  );
}

export default App;
