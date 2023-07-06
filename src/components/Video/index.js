import React, { useRef, useState } from 'react'
import styles from './Video.module.scss'
import {Header} from '../Layout/Header'
import {Footer} from '../Layout/Footer'
import moment from 'moment'
import { getTokenFromCookie, URL } from '../../utility'

const Video = () => {
    const videoRef = useRef(null)
    const [playPauseText, setPlayPauseText] = useState('播放')
    const [currentTime, setCurrentTime] = useState('')
    return (
        <>
            <div style={{ position: 'fixed', width: '100%', zIndex: 100 }}>
                <Header />
            </div>
            <div className={styles.videoWrapper}>
                <div className={styles.video}>
                    <div className={styles.videoCard}>
                        <h1>科普视频</h1>
                        <p className={styles.caption}>视频播放完毕后将自动更新首页任务列表</p>
                        <video
                            src="/video4.mp4"
                            className={styles.videoPlayer}
                            ref={videoRef}
                            onEnded={e => {
                                fetch(URL + 'api/video4/', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + getTokenFromCookie(),
                                    },
                                })
                                setPlayPauseText('重新播放')
                            }}
                            onTimeUpdate={() => {
                                const currentMoment = moment.duration(videoRef.current.currentTime, 'seconds')
                                const durationMoment = moment.duration(videoRef.current.duration, 'seconds')
                                setCurrentTime(
                                    `${currentMoment.minutes() + ':' + currentMoment.seconds()}/${
                                        durationMoment.minutes() + ':' + durationMoment.seconds()
                                    }`
                                )
                            }}
                            // controls
                        />
                        <div className={styles.videoControl}>
                            <span className={styles.videoTime}>{currentTime}</span>
                            <button
                                className={styles.videoButton}
                                onClick={() => {
                                    if (videoRef.current.paused) {
                                        videoRef.current.play()
                                        setPlayPauseText('暂停')
                                    } else {
                                        videoRef.current.pause()
                                        setPlayPauseText('播放')
                                    }
                                }}
                            >
                                {playPauseText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <Footer />
            </div>
        </>
    )
}

export default Video
