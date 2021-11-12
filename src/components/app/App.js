import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";

import decoration from '../../resources/vision.png'
import { useState } from "react";


const App = () =>{

  const[selectedChar, setSelectedChar] = useState(null)

  const onCharSelected = (id) => {
    setSelectedChar(id)
  }
  
     return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <div className="char__content">
            <CharList onCharSelected={onCharSelected}/>
            <CharInfo charId={selectedChar}/>
          </div>
          <img src={decoration} alt="vision" className="bg-decoration" />
        </main>
      </div>
  )
}

export default App;
