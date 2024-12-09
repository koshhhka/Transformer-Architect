import { Link } from "react-router-dom";
import styles from "./Level1.module.css"
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { useState } from "react";

interface DragBlockProps {
  id: string;
  text: string;
}

const DragBlock: React.FC<DragBlockProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: id,
    item: { id, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className={styles.block}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
    >
      {text}
    </div>
  );
};

const allowedMappings: Record<string, string[]> = {
  block1: ["drop2", "drop4"],
  block2: ["drop2", "drop4"],
  block3: ["drop1", "drop3"],
  block4: ["drop1", "drop3"],
};

interface DropBlockProps {
  id: string;
  className?: string;
}

const DropBlock: React.FC<DropBlockProps> = ({ id, className }) => {
  const [droppedItem, setDroppedItem] = useState<string | null>(null);
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  // Функция для определения цвета по тексту
  const getColorByText = (text: string): string => {
    switch (text) {
      case "Multi-Head Attention":
        return "#CD00A0";
      case "Feed Forward":
        return "#02ABBE";
      case "Add & Norm":
        return "#8C06BE";
      default:
        return "";
    }
  };

  const [, drop] = useDrop(() => ({
    accept: Object.keys(allowedMappings), // Принимаем все DragBlock
    drop: (item: { id: string; text: string }) => {
      if (allowedMappings[item.id]?.includes(id)) {
        setDroppedItem(item.text);
        setCustomBackground(getColorByText(item.text));
      } else {
        // Можно добавить уведомление или индикацию об ошибке
        console.error("Неправильное место для этого блока!");
      }
    },
    canDrop: (item: { id: string; text: string }) =>
      allowedMappings[item.id]?.includes(id), // Проверяем, подходит ли DragBlock
  }));

  return (
    <div
      ref={drop}
      style={{backgroundColor: customBackground || undefined}}
      className={`${className} ${droppedItem ? styles.dropped : ""}`}
    >
      {droppedItem}
    </div>
  );
};

interface Block {
  id: string | undefined; // id может быть undefined
  text: string;
}

const blocks: Block[] = [
  { id: "block1", text: "Multi-Head Attention" },
  { id: "block2", text: "Feed Forward" },
  { id: "block3", text: "Add & Norm" },
  { id: "block4", text: "Add & Norm" },
];

const Level1: React.FC = () => {
  return (
    <div>
      <header className={styles.levelheader}>
        <div className={styles.homeconteiner}>
          <Link to="/">
            <img src="/src/assets/homebutton.svg" className={styles.homebutton} alt="Home" />
          </Link>
        </div>
        <p className={styles.numoflevel}>Уровень 1</p>
        <div className={styles.questionsettings}>
          <img src="/src/assets/question.svg" className={styles.questionbutton} alt="Help" />
          <Link to="/levels">
            <img src="/src/assets/levels.svg" className={styles.levelsbutton} alt="Levels" />
          </Link>
        </div>
      </header>
      <p className={styles.descroflevel}>
        Исходная фраза: "I LOVE DOGS"
      </p>
      <div className={styles.maincontainer}>
        <div className={styles.container1}>
          <p className={styles.containername}>Перенести блоки в пустые ячейки</p>
          {blocks.map((block) => (
            <DragBlock key={block.id ?? 'default-id'} id={block.id ?? 'default-id'} text={block.text} />
          ))}
        </div>

        <div className={styles.container2}>
        <div className={styles.invblocksgroup}>
          {["drop1", "drop2", "drop3", "drop4"].map((dropId, index) => (
            <DropBlock
              key={dropId}
              id={dropId}
              className={index % 2 === 0 ? styles.evenBlock : styles.oddBlock}
            />
          ))}
        </div>
        </div>

        <div className={styles.container3}>
          <Link to="/level2">
            <button>Готово</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level1;