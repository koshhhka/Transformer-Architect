import {LevelCompletion} from "../../App.tsx";
import styles from './EndScreen.module.css';

const EndScreen = ({results}: {results: LevelCompletion[]}) => {
    return (
        <div className={styles.maincontainer}>
            <h1 className={styles.gameovertext}>
                Игра окончена!
            </h1>
            <p className={styles.resulttext}>
                Ваши результаты:
            </p>
            {
                results.map((result, index) => (
                    <p key={index} className={styles.levelinf}>
                        Уровень {index + 1}: {result.value}%
                    </p>
                ))
            }
            <p className={styles.middleres}>
                Средний результат: {results.reduce((acc, result) => acc + result.value, 0) / results.length}%
            </p>
        </div>
    );
};

export default EndScreen;