import AppHeader from "../appHeader/AppHeader";
import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import RandomChar from "../randomChar/RandomChar";

import decoration from '../../resources/vision.png'

const App = () => {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <RandomChar/>
          <div className="char__content">
            <CharList/>
            <CharInfo/>
          </div>
          <img src={decoration} alt="vision" className="bg-decoration" />
        </main>
      </div>
    )
}

export default App;
