
import React, { useState } from 'react';
import Login from './components/Login';
import AtendimentosListagem from './components/AtendimentosListagem';
import "./App.css"

function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
      {
        !token 
        ? 
          (<Login setToken={setToken} />)
        :
          (<AtendimentosListagem token={token}/>)
      }
    </div>
  )
}
export default App;