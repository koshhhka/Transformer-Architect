import {Link, useNavigate} from "react-router-dom";
import styles from "./Level3.module.css"
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
    {id: "block1", text: "Masked Multi-Head Attention", color: "#CD00A0"},
    {id: "block2", text: "Feed Forward", color: "#02ABBE"},
    {id: "block3", text: "Multi-Head Attention", color: "#CD00A0"},
    {id: "block4", text: "Add & Norm", color: "#8C06BE"},
    {id: "block5", text: "Add & Norm", color: "#8C06BE"},
    {id: "block6", text: "Add & Norm", color: "#8C06BE"},
];


interface Level3Props {
    setGlobalState: Dispatch<SetStateAction<LevelCompletion[]>>
}

const Level3 = ({setGlobalState}: Level3Props) => {
    const navigate = useNavigate();
    const [droppedBlocks, setDroppedBlocks] = useState<Record<string, string>>({}); //slotId, blockId

    const correctItems: { slotId: string, blockId: string[] }[] = [
        {slotId: "drop1", blockId: ["block6"]},
        {slotId: "drop2", blockId: ["block2"]},
        {slotId: "drop3", blockId: ["block4"]},
        {slotId: "drop4", blockId: ["block1", "block3", "block5"]},
        {slotId: "drop5", blockId: ["block1", "block3", "block5"]},
        {slotId: "drop6", blockId: ["block1", "block3", "block5"]},
    ];

    const allowedItems: Record<string, string[]> = {
        "drop1": ["block2", "block4", "block6"],
        "drop2": ["block2", "block4", "block6"],
        "drop3": ["block2", "block4", "block6"],
        "drop4": ["block1", "block3", "block5"],
        "drop5": ["block1", "block3", "block5"],
        "drop6": ["block1", "block3", "block5"]
    };

    const handleLevelCompletion = () => {
        const correct = correctItems.filter((item) => item.blockId.includes(droppedBlocks[item.slotId]));
        const completion = correct.length / correctItems.length * 100;
        setGlobalState((prev) => [...prev, {id: 3, value: completion}]);
        console.log("Level 3 completed with", completion, "percent");
        navigate("/level4");
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
                <p className={styles.numoflevel}>Задание 3</p>
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
                    <p className={styles.containername}>Блоки декодера</p>
                    {blocks.filter((block) => !Object.values(droppedBlocks).includes(block.id)).map((block) => (
                        <DragBlock key={block.id} block={block}/>
                    ))}
                </div>

                <div className={styles.container22}>
                    <div className={styles.container2}>
                        <div className={styles.invblocksgroup}>
                            {["drop1", "drop2", "drop3", "drop4", "drop5", "drop6"].map((dropId) => (
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
                <Image text={"Соберите блок декодера в правильном порядке"}/>
            </div>
        </div>
    );
};

export default Level3;