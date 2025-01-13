import { Link } from "react-router-dom";
import styles from "./Levels.module.css"

const Levels = () => {
    return (
        <div>
            <header className={styles.levelheader}>
                <div className={styles.homeconteiner}>
                    <Link to="/">
                        <img src="/src/assets/homebutton.svg" className={styles.homebutton} alt="Home" />
                    </Link>
                </div>

                <p className={styles.numoflevel}> Уровни</p>
            </header>
            <div className={styles.maincontainer}>
                <div className={styles.numoflevel}>
                    <p className={styles.num}> 1 </p>
                    <img src="/src/assets/blocklevel.svg"/>
                </div>
            </div>
        </div>
    )
}

export default Levels;