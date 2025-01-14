import {Link} from "react-router-dom";
import styles from "./Level5.module.css"
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useState} from "react";
import {LevelCompletion} from "../../App.tsx";
import {DragBlock} from "../../components/DragBlock/DragBlock.tsx";
import {Slot} from "../../components/Slot/Slot.tsx";
import { Block } from "../../types/block.ts";
import {Image} from "../../components/Image/Image.tsx";
import homebutton from '/src/assets/homebutton.svg';
import question from '/src/assets/question.svg';
import levels from '/src/assets/levels.svg'

interface Level {
    setGlobalState: Dispatch<SetStateAction<LevelCompletion[]>>
}

const Level5 = ({setGlobalState}: Level) => {
    const [droppedBlocks, setDroppedBlocks] = useState<Record<string, string>>({}); //slotId, blockId
    const navigate = useNavigate();

    const handleDrop = (item: { slotId: string; dropId: string }) => {
        setDroppedBlocks(prev => ({...prev, [item.slotId]: item.dropId}));
    };

    const handleLevelCompletion = () => {
        const correct = correctItems.filter((item) => item.blockId.includes(droppedBlocks[item.slotId]));
        const completion = correct.length / correctItems.length * 100;
        setGlobalState((prev) => [...prev, {id: 5, value: completion}]);
        console.log("Level 5 completed with", completion, "percent");
        navigate("/end");
    }

    const blocks2: Block[] = [
        {id: "block1", text: "Я", color: "#CD00A0"},
        {id: "block2", text: "ЛЮБЛЮ", color: "#8C06BE"},
        {id: "block3", text: "СОБАК", color: "#051FC3"}
    ];

    const allowedItems: Record<string, string[]> = {
        "drop1": ["block1", "block2", "block3"],
        "drop2": ["block1", "block2", "block3"],
        "drop3": ["block1", "block2", "block3"]
    };

    const correctItems: { slotId: string, blockId: string[] }[] = [
        {slotId: "drop1", blockId: ["block1"]},
        {slotId: "drop2", blockId: ["block2"]},
        {slotId: "drop3", blockId: ["block3"]}
    ];

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
                <div className={styles.container11}>
                    <div className={styles.container1}>
                        <p className={styles.containername}>Словарь</p>
                        {blocks2.filter((block) => !Object.values(droppedBlocks).includes(block.id)).map((block) => (
                            <DragBlock key={block.id} block={block}/>
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
                                        <div className={styles.dropped}> [0.8, 0.1, 0.1] </div>
                                        <div className={styles.dropped}> [0.2, 0.7, 0.1] </div>
                                        <div className={styles.dropped}> [0.1, 0.2, 0.7] </div>
                                    </div>
                                </div>

                                <div className={styles.container22}>
                                    <div className={styles.invblocksgroup}>
                                        {["drop1", "drop2", "drop3"].map((dropId) => (
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
                            <button onClick={handleLevelCompletion} className={styles.toLevel2} disabled={Object.keys(droppedBlocks).length !== Object.keys(correctItems).length}>
                                <span>На следующий уровень</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Image text={"Перетащите слова в правильном порядке, чтобы собрать перевод"}/>
            </div>
        </div>
    );
};

export default Level5;