import { Link } from "react-router-dom";

const Level1 = () => {
    return (
      <div className="container">
        <h1>Второй экран</h1>
        <div className="emptycontainer1"></div>
        <div className="emptycontainer2"></div>
        <div className="emptycontainer1"></div>
        <div className="emptycontainer2"></div>
        <div className="emptycontainer2"></div>
        <Link to="/level2">
          <button>Готово</button>
        </Link>
      </div>
    );
};

export default Level1