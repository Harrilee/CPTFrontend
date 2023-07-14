import React, { useState, useEffect } from 'react'
import styles from './Welcome.module.scss'
import {Header} from '../Layout/Header'
import {Footer} from '../Layout/Footer'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL, validateLogin, signOut } from '../../utility'

export function Welcome () {
    const [hasUnread, setHasUnread] = useState(false)

    useEffect(() => {
        fetch(URL + 'api/msg/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        }).then(res => res.json()).then(res => {
            const unreadSum = res.message.reduce((acc: number, cur: any) => acc + (cur.isRead ? 0 : 1), 0)
            if (unreadSum > 0) {
                setHasUnread(true)
            }
        })
    }, [])

    return <div className={styles.wrapper}>
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
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.cardTitle}>
                            站内信
                        </h2>
                        {hasUnread && <span className={styles.unread}>●</span>}
                    </div>
                        <img src="/folder.svg" alt="站内信" className={styles.image} />
                        <button className={styles.button} onClick={() => (location.href = '/message')}>
                            点击进入
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

}

export default Welcome
