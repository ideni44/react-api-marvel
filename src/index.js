import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss'
import MarvelService from './services/MarvelService'

// const marvelService = new MarvelService()

// marvelService.getAllCharacters().then(res=>res.data.results.forEach(i=>console.log(i)))
// marvelService.getCharacter(1011052).then(res=>console.log(res.data.results))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

