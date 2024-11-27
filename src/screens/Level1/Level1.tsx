import { Link } from "react-router-dom";
import styles from "./Level1.module.css"

interface Block {
  id?: string,
  text: string
}

const blocks: Block[] = [
  {id: 'block1', text: 'Multi-Head Attention'},
  {id: 'block2', text: 'Input Embedding'},
  {id: 'block3', text: 'Feed Forward'},
  {id: 'block3', text: 'Add & Norm'},
  {id: 'block3', text: 'Add & Norm'}
  // {id: 'block3', text: 'Feed Forward', className: 'block5 color5 textstyle fill'},
  // {id: 'block4', text: 'Add & Norm', className: 'block1 color1 textstyle fill'},
  // {id: 'block5', text: 'Add & Norm', className: 'block3 color3 textstyle fill'},
]


const DragBlock = ({text}: Block) => {
  return (
    <div className={styles.block}>
      {text}
    </div>
  )
}
const Level1 = () => {
    return (
      <div>
        <header>
          <p className={styles.numoflevel}>Уровень 1</p>
          <p className={styles.descroflevel}>Собери блок <u>encoder</u>, чтобы подготовить текстовые данные</p>
        </header>
        <div className={styles.maincontainer}>
          <div className={styles.container1}>
            <p className={styles.containername}>Перенести блоки в пустые ячейки</p>
            <DragBlock text={blocks[0].text}/>
            <DragBlock text={blocks[1].text}/>
            <DragBlock text={blocks[2].text}/>
            <DragBlock text={blocks[3].text}/>
            <DragBlock text={blocks[4].text}/>
          </div>
    

          <div className={styles.container2}>
            <div>
              <div className={styles.block1}></div>
              <div className={styles.block2}></div>
              <div className={styles.block3}></div>
              <div className={styles.block4}></div>
              <div className={styles.block5}></div>
              <div className={styles.invisibleblock1}></div>
            </div>
          </div>


          <div>
            <div className={styles.container3}>
              <p className={styles.containername}>Перенести текст на места пропусков</p>
              <div className={styles.textstyle}>Position encodings</div>
              <div className={styles.textstyle}>Inputs</div>
              <div className={styles.textstyle}>Nx</div>
            </div>
            <Link to="/level2">
              <button>Готово</button>
            </Link>
          </div>           
        </div>
    </div>
  );
};

export default Level1;