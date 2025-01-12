import { Link } from "react-router-dom";
import styles from "./Level1.module.css"
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { useState } from "react";

interface DragBlockProps {
  id: string;
  text: string
}

const DragBlock = ({id, text}: DragBlockProps) => {
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
  block1: ["drop1", "drop2", "drop3"],
  block2: ["drop1", "drop2", "drop3"],
  block3: ["drop1", "drop2", "drop3"],
  block4: ["drop4", "drop5", "drop6"],
  block5: ["drop4", "drop5", "drop6"],
  block6: ["drop4", "drop5", "drop6"]
};

interface DropBlockProps {
  id: string;
  className?: string;
  onDrop?: (item: { id: string; text: string}) => void;
}

const DropBlock = ({id, className, onDrop}:DropBlockProps)=> {
  const [droppedItem, setDroppedItem] = useState<string | null>(null);
  const [customBackground, setCustomBackground] = useState<string | null>(null);

  // Функция для определения цвета по тексту
  const getColorByText = (text: string): string => {
    switch (text) {
      case "[1.0, 2.3, -0.5]":
        return "#CD00A0";
      case "[0.8, 1.2, -0.3]":
        return "#8C06BE";
      case "[0.1, 0.5, 0.8]":
        return "#051FC3";
      case "[1.0, 0.0, 0.0]":
        return "#051FC3";
      case "[0.0, 1.0, 0.0]":
        return "#8C06BE";
      case "[0.7, -3.1, 2.0]":
        return "#CD00A0";
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
        onDrop?.(item);
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

interface Block1 {
  id: string; // id может быть undefined
  text: string;
}

const blocks1: Block1[] = [
  { id: "block1", text: "[1.0, 2.3, -0.5]" },
  { id: "block2", text: "[0.8, 1.2, -0.3]" },
  { id: "block3", text: "[0.1, 0.5, 0.8]" }
];

interface Block2 {
  id: string; // id может быть undefined
  text: string;
}

const blocks2: Block2[] = [
  { id: "block4", text: "[1.0, 0.0, 0.0]" },
  { id: "block5", text: "[0.0, 1.0, 0.0]" },
  { id: "block6", text: "[0.7, -3.1, 2.0]" }
];

interface DroppedItem {
  id: string; 
  text: string
}

const Image =() => {
  return(
    <div className={styles.messagegroup}>
      <div className={styles.messagetextaround}>
        <div className={styles.messagetext}>
          Добавьте эмбеддинг и позицию к каждому слову в фразе.
        </div>
      </div>
      <img className={styles.robot} src="/src/assets/robot.svg"></img>
    </div>
  )
}

interface CorrectItem {
  id: string, 
  text: string
}

const correctItems: CorrectItem[] = [
  {id: "drop1", text: "[1.0, 2.3, -0.5]"},
  {id: "drop2", text: "[0.8, 1.2, -0.3]"},
  {id: "drop3", text: "[0.1, 0.5, 0.8]"},
  {id: "drop4", text: "[1.0, 0.0, 0.0]"},
  {id: "drop5", text: "[0.0, 1.0, 0.0]"},
  {id: "drop6", text: "[0.7, -3.1, 2.0]"}
]

interface Level {
  setGlobalState: (state: any) => void;
}

const Level1 = ({}: Level) => {
  const [droppedBlocks, setDroppedBlocks] = useState<DroppedItem[]>([]);

  const handleDrop = (item: { id: string; text: string}) => {
    setDroppedBlocks(prev => [...prev, item]);
  };
  
  return (
    <div>
      <header className={styles.levelheader}>
        <div className={styles.homeconteiner}>
          <Link to="/">
            <img src="/src/assets/homebutton.svg" className={styles.homebutton} alt="Home" />
          </Link>
        </div>
        <p className={styles.numoflevel}>Задание 1</p>
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
        <div className={styles.container11}>
          <div className={styles.container1}>
            <p className={styles.containername}>Эмбединги</p>
            {blocks1.filter((block) => !droppedBlocks.map(dropped => dropped.id).includes(block.id)).map((block) => (
              <DragBlock key={block.id ?? 'default-id'} id={block.id ?? 'default-id'} text={block.text} />
            ))}
          </div>
        
          <div className={styles.container1}>
            <p className={styles.containername}>Позиции</p>
            {blocks2.filter((block) => !droppedBlocks.map(dropped => dropped.id).includes(block.id)).map((block) => (
              <DragBlock key={block.id ?? 'default-id'} id={block.id ?? 'default-id'} text={block.text} />
            ))}
          </div>
        </div>
        <div>
        <div className={styles.direction}>
          <div className={styles.textnames}>
            <p className={styles.textname}> "I": </p>
            <p className={styles.textname}> "LOVE": </p>
            <p className={styles.textname}> "DOGS": </p>
          </div>

          <div>
            <div className={styles.nameanswercontainer}> 
              <p className={styles.text1}> Добавьте эмбеддинг </p>
              <p className={styles.text2}> Добавьте позиционную кодировку </p>
            </div>
          
            <div className={styles.answercontainer}>
              <div className={styles.container2}>
                <div className={styles.invblocksgroup}>
                  {["drop1", "drop2", "drop3"].map((dropId) => (
                    <DropBlock
                      key={dropId}
                      id={dropId}
                      className={styles.baseBlock}
                      onDrop={handleDrop}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.container22}>
                <div className={styles.invblocksgroup}>
                  {["drop4", "drop5", "drop6"].map((dropId) => (
                    <DropBlock
                      key={dropId}
                      id={dropId}
                      className={styles.baseBlock}
                      onDrop={handleDrop}
                    />
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.direction2}>
          <div className={styles.resetbutton}>
           <button onClick={() => navigate("/level2")} className={styles.toLevel2}>
              <span>Сбросить</span>
           </button>
          </div>
          <div className={styles.checkbutton}>
            <button to="/level2" className={styles.toLevel2}>
             <span>Проверить сброку</span>
            </button>
          </div>
        </div>
        </div>

        <Image></Image>
      </div>
    </div>
  );
};

export default Level1;