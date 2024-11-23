import { Link } from "react-router-dom";
import "./Level1.css"

const Level1 = () => {
    return (
      <div>
        <header>
          <h1 className="numoflevel">Уровень 1</h1>
        </header>
          <div className="maincontainer">
            <div className="container1">
              <p className="containername">Перенести блоки в пустые ячейки</p>
              <div
                draggable={true} className="block2 color2 textstyle draggable fill" data-dnd>Multi-Head Attention</div>
              <div draggable={true} className="block4 color4 textstyle draggable fill" data-dnd>Input Emnbedding</div>
              <div draggable={true} className="block5 color5 textstyle draggable fill" data-dnd>Feed Forward</div>
              <div draggable={true} className="block1 color1 textstyle draggable fill" data-dnd>Add & Norm</div>
              <div draggable={true} className="block3 color3 textstyle draggable fill" data-dnd>Add & Norm</div>
            </div>

            <div  className="container2">
              <div className="block1 direction1 emptyblockcolor empty"></div>
              <div className="block2 direction2 emptyblockcolor empty"></div>
              <div className="block3 direction1 emptyblockcolor empty"></div>
              <div className="block4 direction3 emptyblockcolor empty"></div>
              <div className="block5 emptyblockcolor empty"></div>
            </div>

            <div className="container3">
              <p className="containername">Перенести текст на места пропусков</p>
              <div draggable={true} className="textstyle draggable">Position encodings</div>
              <div draggable={true} className="textstyle draggable">Inputs</div>
              <div draggable={true} className="textstyle draggable">Nx</div>
              <Link to="/level2">
                <button>Готово</button>
              </Link>
            </div>           
          </div>
      </div>
    );
};

export default Level1