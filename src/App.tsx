import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Level1 from './screens/Level1/Level1';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const App: React.FC = () => {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/level1" element={<Level1 />} />
          <Route path="/level2" element={<ThirdScreen />} />
        </Routes>
      </Router>
    </div>
    
  );
};




const ThirdScreen = () => {
  return (
    <div>
      <h1>Третий экран</h1>
    </div>
  );
};

// interface Props {
//   handleButtonClick?: () => void;
// }

// const App: React.FC = () => {
//   const [showGameScreen, setShowGameScreen] = useState<boolean>(false);

//   const handleButtonClick = (): void => {
//     setShowGameScreen(true);
//   };

//   return (
//     <div className="app">
//       {!showGameScreen ? (
//         <StartScreen handleButtonClick={handleButtonClick} />
//       ) : (
//         <GameScreen1 />
//       ) }
//     </div>
//   );
// };

// const StartScreen: React.FC<Props> = ({ handleButtonClick }) => (
//   <div className="start-screen">
//     <h1>AI-MERGE</h1>
//     <button onClick={handleButtonClick}>Начать игру</button>
//     <button> Настройки </button>
//   </div>
// );
// const GameScreen1: React.FC<Props> = () => (
//   <div className="game-screen">
//     <h1>Задание 1</h1>
//   </div>
// );



// function App() {
//   const [value, changeValue] = useState(0)
//   return (
//     <button onClick={() => changeValue(value + 1)} > Value = {value} </button>
//   )
// }

export default App;
