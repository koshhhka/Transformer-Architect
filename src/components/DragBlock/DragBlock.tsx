import {useDrag} from "react-dnd";
import styles from "./DragBlock.module.css"
import {Block} from "../../types/block.ts";


export const DragBlock = ({block}: {block: Block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.id,
    item: block,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className={styles.block}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        backgroundColor: block.color,
      }}
    >
      {block.text}
    </div>
  );
};