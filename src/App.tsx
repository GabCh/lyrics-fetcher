import React from 'react';
import logo from './logo.svg';
import './App.css';
import LyricsQuery from './components/LyricsQuery';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Formation Desjardins: Lyrics finder in React + Typescript</h1>
      </header>
      <LyricsQuery />
    </div>
  );
}

export default App;
