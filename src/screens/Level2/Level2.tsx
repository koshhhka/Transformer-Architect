import {Link, useNavigate} from "react-router-dom";
import styles from "./Level2.module.css"
import {Dispatch, SetStateAction, useState} from "react";
import {LevelCompletion} from "../../App.tsx";
import { Block } from "../../types/block.ts";
import {DragBlock} from "../../components/DragBlock/DragBlock.tsx";
import {Slot} from "../../components/Slot/Slot.tsx";
import {Image} from "../../components/Image/Image.tsx";
import homebutton from '/src/assets/homebutton.svg';
import question from '/src/assets/question.svg';
import levels from '/src/assets/levels.svg'

const blocks: Block[] = [
    {id: "block1", text: "Multi-Head Attention", color: "#CD00A0"},
    {id: "block2", text: "Feed Forward", color: "#02ABBE"},
    {id: "block3", text: "Add & Norm", color: "#8C06BE"},
    {id: "block4", text: "Add & Norm", color: "#8C06BE"},
];


interface Level2Props {
    setGlobalState: Dispatch<SetStateAction<LevelCompletion[]>>
}

const Level2 = ({setGlobalState}: Level2Props) => {
    const navigate = useNavigate();
    const [droppedBlocks, setDroppedBlocks] = useState<Record<string, string>>({}); //slotId, blockId

    const correctItems: { slotId: string, blockId: string[] }[] = [
        {slotId: "drop1", blockId: ["block3", "block4"]},
        {slotId: "drop2", blockId: ["block2"]},
        {slotId: "drop3", blockId: ["block3", "block4"]},
        {slotId: "drop4", blockId: ["block1"]},
    ];

    const allowedItems: Record<string, string[]> = {
        "drop2": ["block1", "block2"],
        "drop4": ["block1", "block2"],
        "drop1": ["block3", "block4"],
        "drop3": ["block3", "block4"]
    };

    const handleLevelCompletion = () => {
        const correct = correctItems.filter((item) => item.blockId.includes(droppedBlocks[item.slotId]));
        const completion = correct.length / correctItems.length * 100;
        setGlobalState((prev) => [...prev, {id: 2, value: completion}]);
        console.log("Level 2 completed with", completion, "percent");
        navigate("/level3");
    }

    const handleDrop = (item: { slotId: string; dropId: string }) => {
        setDroppedBlocks(prev => ({...prev, [item.slotId]: item.dropId}));
    };

    return (
        <div>
            <header className={styles.levelheader}>
                <div className={styles.homeconteiner}>
                    <Link to="/">
                        <img src={homebutton} className={styles.homebutton} alt="Home"/>
                    </Link>
                </div>
                <p className={styles.numoflevel}>Задание 1</p>
                <div className={styles.questionsettings}>
                    <img src={question} className={styles.questionbutton} alt="Help"/>
                    <Link to="/levels">
                        <img src={levels} className={styles.levelsbutton} alt="Levels"/>
                    </Link>
                </div>
            </header>
            <p className={styles.descroflevel}>
                Исходная фраза: "I LOVE DOGS"
            </p>
            <div className={styles.maincontainer}>
                <div className={styles.container1}>
                    <p className={styles.containername}>Блоки энкодера</p>
                    {blocks.filter((block) => !Object.values(droppedBlocks).includes(block.id)).map((block) => (
                        <DragBlock key={block.id} block={block}/>
                    ))}
                </div>

                <div className={styles.container22}>
                    <div className={styles.container2}>
                        <div className={styles.invblocksgroup}>
                            {["drop1", "drop2", "drop3", "drop4"].map((dropId) => (
                                <Slot
                                    key={dropId}
                                    id={dropId}
                                    className={styles.baseBlock}
                                    onDrop={handleDrop}
                                    accepts={allowedItems[dropId]}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.direction2}>
                        <div className={styles.resetbutton}>
                            <button
                                className={styles.toLevel3}>
                                <span>Сбросить</span>
                            </button>
                        </div>
                        <div className={styles.checkbutton}>
                            <button onClick={handleLevelCompletion} className={styles.toLevel3} disabled={Object.keys(droppedBlocks).length !== Object.keys(correctItems).length}>
                                <span>Проверить сброку</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Image text={"Разместите блоки в правильном порядке, чтобы собрать энкодер"}/>
            </div>
        </div>
    );
};

export default Level2;