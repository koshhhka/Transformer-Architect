import {Link} from "react-router-dom";
import styles from "./Level1.module.css"
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

const Level1 = ({setGlobalState}: Level) => {
    const [droppedBlocks, setDroppedBlocks] = useState<Record<string, string>>({}); //slotId, blockId
    const navigate = useNavigate();

    const handleDrop = (item: { slotId: string; dropId: string }) => {
        setDroppedBlocks(prev => ({...prev, [item.slotId]: item.dropId}));
    };

    const handleLevelCompletion = () => {
        const correct = correctItems.filter((item) => item.blockId.includes(droppedBlocks[item.slotId]));
        const completion = correct.length / correctItems.length * 100;
        setGlobalState((prev) => [...prev, {id: 1, value: completion}]);
        console.log("Level 1 completed with", completion, "percent");
        navigate("/level2");
    }

    const blocks1: Block[] = [
        {id: "block1", text: "[1.0, 2.3, -0.5]", color: "#CD00A0"},
        {id: "block2", text: "[0.8, 1.2, -0.3]", color: "#8C06BE"},
        {id: "block3", text: "[0.1, 0.5, 0.8]", color: "#051FC3"}
    ];

    const blocks2: Block[] = [
        {id: "block4", text: "[1.0, 0.0, 0.0]", color: "#051FC3"},
        {id: "block5", text: "[0.0, 1.0, 0.0]", color: "#8C06BE"},
        {id: "block6", text: "[0.7, -3.1, 2.0]", color: "#CD00A0"}
    ];

    const allowedItems: Record<string, string[]> = {
        "drop1": ["block1", "block2", "block3"],
        "drop2": ["block1", "block2", "block3"],
        "drop3": ["block1", "block2", "block3"],
        "drop4": ["block4", "block5", "block6"],
        "drop5": ["block4", "block5", "block6"],
        "drop6": ["block4", "block5", "block6"]
    };

    const correctItems: { slotId: string, blockId: string[] }[] = [
        {slotId: "drop1", blockId: ["block1"]},
        {slotId: "drop2", blockId: ["block2"]},
        {slotId: "drop3", blockId: ["block3"]},
        {slotId: "drop4", blockId: ["block4"]},
        {slotId: "drop5", blockId: ["block5"]},
        {slotId: "drop6", blockId: ["block6"]}
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
                        <p className={styles.containername}>Эмбединги</p>
                        {blocks1.filter((block) => !Object.values(droppedBlocks).includes(block.id)).map((block) => (
                            <DragBlock key={block.id} block={block}/>
                        ))}
                    </div>

                    <div className={styles.container1}>
                        <p className={styles.containername}>Позиции</p>
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

                                <div className={styles.container22}>
                                    <div className={styles.invblocksgroup}>
                                        {["drop4", "drop5", "drop6"].map((dropId) => (
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
                <Image text={"Добавьте эмбеддинг и позицию к каждому слову в фразе."}/>
            </div>
        </div>
    );
};

export default Level1;