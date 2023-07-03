import React from 'react'
import styles from './Layout.module.scss'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.col}>
                    <div className={styles.banner}>
                        <img src="/rainbow.png" alt="上海纽约大学压力与健康研究" className={styles.image} />
                        <div className={styles.bannerText}>上海纽约大学压力与健康研究</div>
                    </div>
                    <div className={styles.copyright}>@ XYZ 20XX --- 20XX. All rights reserved.</div>
                </div>
                <div className={styles.col}>
                    <div className={styles.title}>联系我们</div>
                    <div className={styles.contact}>
                        +86 1234567890
                        <br />
                        (每周六，周日 14:00 - 16:00）
                    </div>
                    <div className={styles.contact}>
                        <a href="mailto:shanghai.diversity.science.lab@nyu.edu">
                            shanghai.diversity.science.lab@nyu.edu
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
