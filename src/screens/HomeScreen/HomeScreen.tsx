import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
      <div className='homescreen'>
        <img src='/src/assets/logo.png'/>
        <h1 className='logo'>AI-MERGE</h1>
        <Link to="/level1">
          <button className='togame'>Перейти на второй экран</button>
        </Link>
      </div>
    );
};

export default HomeScreen