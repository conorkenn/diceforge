import React from 'react';
import './App.css';
import DiceRoller from './components/DiceRollerComponent/DiceRollerComponent';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <div>
      <NavbarComponent />
      <DiceRoller />
    </div>

  );
}

export default App;
