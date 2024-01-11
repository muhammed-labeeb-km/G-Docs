import './App.css';
import Doc from './component/Doc';
import Type from './component/Type';
import {app,dataStore} from './component/firebase'
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';
function App() {
  
  const [tryed,setTry] = useState('')
  // console.log(tryed);
  return (
    <div className="App">
    <Routes>
      <Route path='/'  element={<Doc dataStore={dataStore} tryed={tryed} setTry={setTry} />} ></Route>
      <Route path='/type/:id' element={<Type dataStore={dataStore} tryed={tryed} />} ></Route>
    </Routes>
    </div>
  );
}

export default App;
