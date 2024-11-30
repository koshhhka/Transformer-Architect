import { Link } from 'react-router-dom';
import "./HomeScreen.css"
const HomeScreen = () => {
    return (
      <div className='homescreen'>
        <img className='logoImage' src='/src/assets/logo.png'/>
        <h1 className='logo'>AI-MERGE</h1>
        <Link to="/level1">
          <button className='togame'> <p>Играть</p> </button>
        </Link>
      </div>
    );
};

export default HomeScreen