import React, { useEffect, useState, useRef } from 'react'
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import style from './Feedback.module.scss'
import Nav from 'react-bootstrap/Nav'
import { Task } from '../Task/Task'
import { getTokenFromCookie, URL, signOut } from '../../utility'
import Markdown from 'markdown-to-jsx';

interface FeedbackProps {
    day: number
}

export default function Feedback(props: FeedbackProps) {
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL + 'api/info/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 'Success') {
                    const msg = JSON.parse(res.message)
                    setInfo(msg[`feedbackDay${props.day}`])
                    setLoading(false)
                }
            })
            .then(() => {
                fetch(URL + 'api/info/', {
                    method: 'PATCH',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + getTokenFromCookie(),
                    },
                    body: JSON.stringify({
                        [`feedbackDay${props.day}Viewed`]: true
                    })
                })
            })
    }, [])
    return <div className={style.feedbackwrapper}>
        <Header />
        <div className={style.container}>
            <div className={style.content}>
                <h1>写作反馈：第{props.day}天</h1>
                <Markdown>
                    {info}
                </Markdown>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '64px' }}>
                    <button onClick={() => window.location.href = '/home'}>已阅</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
}