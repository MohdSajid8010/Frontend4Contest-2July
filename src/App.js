import React, { useState } from 'react';
import './App.css';
import Nav from './Component/Nav';
import Home from './Component/Home';
import DetailInfo from './Component/DetailInfo';

function App() {
  let [res1, setRes1] = useState([]);
  let [res2, setRes2] = useState([]);
  let [err, seterror] = useState("");
  
  return (
    <div className="App">
      <Nav setRes1={setRes1} setRes2={setRes2} seterror={seterror} />
      <Home res1={res1} setRes1={setRes1} res2={res2} setRes2={setRes2} err={err} seterror={seterror} />
    </div>
  );
}

export default App;
