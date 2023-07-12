import React from 'react'
import styles from './Layout.module.scss'

export function Footer() {

    return <footer className={styles.footer}>
        <div className={styles.footerInner}>
            <div className={styles.col}>
                <div className={styles.banner}>
                    <img src="/rainbow.png" alt="上海纽约大学压力与健康研究" className={styles.image}/>
                    <div className={styles.bannerText}>上海纽约大学压力与健康研究</div>
                </div>
                <div className={styles.copyright}><a href='mailto:shanghai.nyuhealthstudy@nyu.edu'>shanghai.nyuhealthstudy@nyu.edu</a><br />© 2023 NYU Shanghai. All rights reserved.</div>
            </div>
        </div>
    </footer>

}





