import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Level1 from './screens/Level1/Level1';
import Level2 from './screens/Level2/Level2';
import Level3 from './screens/Level3/Level3';
import { useState } from "react";
import Levels from './screens/Levels/Levels';

const App: React.FC = () => {
  const [state, setState]= useState();
  const navigate = useNavigate();
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/levels" element={<Levels />}></Route>
          <Route path="/level1" element={<Level1 setGlobalState={setState}/>} />
          <Route path="/level2" element={<Level2 />} />
          <Route path="/level2" element={<Level3 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
