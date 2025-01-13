import styles from "./Image.module.css";

export const Image = ({text}: {text: string}) => {
    return (
        <div className={styles.messagegroup}>
            <div className={styles.messagetextaround}>
                <div className={styles.messagetext}>
                    {text}
                </div>
            </div>
            <img className={styles.robot} src="/src/assets/robot.svg"></img>
        </div>
    )
}