import styles from "./Image.module.css";
import robot from '/src/assets/robot.svg'

export const Image = ({text}: {text: string}) => {
    return (
        <div className={styles.messagegroup}>
            <div className={styles.messagetextaround}>
                <div className={styles.messagetext}>
                    {text}
                </div>
            </div>
            <img className={styles.robot} src={robot}></img>
        </div>
    )
}