import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Level1 from './screens/Level1/Level1';
import Level2 from './screens/Level2/Level2';
import Level3 from './screens/Level3/Level3';
import Level4 from './screens/Level4/Level4';
import Level5 from './screens/Level5/Level5';
import { useState } from "react";
import Levels from './screens/Levels/Levels';
import EndScreen from './screens/EndScreen/EndScreen';

export type LevelCompletion = {
  id: number;
  value: number; // 0-100, in percents
}


const App = () => {
  const [completion, setCompletion]= useState<LevelCompletion[]>([]);
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/levels" element={<Levels/>} />
          <Route path="/level1" element={<Level1 setGlobalState={setCompletion}/>} />
          <Route path="/level2" element={<Level2 setGlobalState={setCompletion}/>} />
          <Route path="/level3" element={<Level3 setGlobalState={setCompletion}/>} />
          <Route path="/level4" element={<Level4 setGlobalState={setCompletion}/>} />
          <Route path="/level5" element={<Level5 setGlobalState={setCompletion}/>} />
          <Route path="/end" element={<EndScreen results={completion}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
