import React from 'react'
import styles from './Welcome.module.scss'
import {Header} from '../Layout/Header'
import {Footer} from '../Layout/Footer'

export function Welcome () {
    return <>
            <div style={{ position: 'fixed', width: '100%', zIndex: 100 }}>
                <Header />
            </div>
            <div className={styles.welcomeWrapper}>
                <div className={styles.welcome}>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>今日任务</h2>
                        <img src="/group.svg" alt="今日任务" className={styles.image} />
                        <button className={styles.button} onClick={() => (location.href = '/home')}>
                            点击开始
                        </button>
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>站内信</h2>
                        <img src="/folder.svg" alt="站内信" className={styles.image} />
                        <button className={styles.button} onClick={() => (location.href = '/message')}>
                            点击进入
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 100 }}>
                <Footer />
            </div>
        </>

}

export default Welcome
