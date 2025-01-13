import {useState} from "react";
import {useDrop} from "react-dnd";
import styles from "./Slot.module.css";
import {Block} from "../../types/block.ts";

interface DropBlockProps {
    id: string,
    className?: string,
    onDrop?: (item: { slotId: string; dropId: string }) => void,
    accepts: string[]
}

export const Slot = ({id, className, onDrop, accepts = []}: DropBlockProps) => {
    const [droppedItem, setDroppedItem] = useState<Block | null>(null);

    const [, drop] = useDrop(() => ({
        accept: accepts,
        drop: (item: Block) => {
            setDroppedItem(item);
            onDrop?.({slotId: id, dropId: item.id});
        },
        canDrop: (item: Block) =>
            accepts.includes(item.id),
    }));

    return (
        <div
            ref={drop}
            style={{backgroundColor: droppedItem?.color || undefined}}
            className={`${className} ${droppedItem ? styles.dropped : ""}`}
        >
            {droppedItem?.text}
        </div>
    );
};