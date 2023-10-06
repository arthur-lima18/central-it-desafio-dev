
import React, { useState } from 'react';
import Login from './components/Login';
import AtividadesListagem from './components/AtividadesListagem';
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
          (<AtividadesListagem token={token}/>)
      }
    </div>
  )
}
export default App;