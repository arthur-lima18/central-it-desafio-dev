
import React, { useState } from 'react';
import Login from './components/Login';
import AtendimentosListagem from './components/AtendimentosListagem';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
      {
        !token 
        ? 
          (<Login setToken={setToken} />)
        :
          (<AtendimentosListagem token={token} setToken={setToken}/>)
      }
    </div>
  )
}
export default App;