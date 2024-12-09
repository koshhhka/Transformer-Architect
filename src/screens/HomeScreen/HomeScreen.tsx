import { Link } from 'react-router-dom';
import "./HomeScreen.css"
const HomeScreen = () => {
    return (
      <div className='main'>
        <div className='homescreen'>
        <img className='logoImage' src='/src/assets/logo.png'/>
        <h1 className='logo'>AI-MERGE</h1>
        <Link to="/level1" className="togame">
          <span>Играть</span>
        </Link>
        <Link to ="/levels" className="tolevels"> 
          <span> Уровни </span>
        </Link>
      </div>
      </div>
    );
};

export default HomeScreen