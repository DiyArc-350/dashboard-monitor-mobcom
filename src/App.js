import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import Desc from "./components/Desc/Desc";
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
        <NavBar />
        <div>
          <Desc />
    </div>
    </div>

  );
}

export default App;
