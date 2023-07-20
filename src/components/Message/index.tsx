import React, { useEffect, useState } from 'react'
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import style from './Message.module.scss'
import Markdown from 'markdown-to-jsx'
import moment from 'moment'
import { getTokenFromCookie, URL } from '../../utility'

interface MsgCardProps {
    title: string
    message: string
    time: string
    isRead: boolean
    id: number
}

const MsgCard = (props: MsgCardProps) => {
    const { title, message, time, isRead, id } = props
    const [show, setShow] = useState(!isRead)
    const handleRead = () => {
        fetch(URL + 'api/msg/', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
            body: JSON.stringify({ id })
        })
        setShow(false)
    }
    return <div className={style.msgCard + `${!show ? (" " + style.isRead) : ""}`} style={{ backgroundImage: 'url(/blue-bubbles.svg)' }}>
        <div className={style.title}>
            <h1>{title}</h1>
            <h2>{moment(time).format("MM-DD hh:mm a")}</h2>
        </div>
        <div className={style.markdown}>
            {message && <Markdown>
                {message}
            </Markdown>}
        </div>
        {show && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className={style.button} onClick={handleRead}>标为已读</button>
        </div>}
    </div>
}

export default function Message() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(URL + 'api/msg/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        }).then(res => res.json()).then(res => {
            setMessages(res.message)
            setLoading(false)
        })
    }, [])

    return <>
        <Header />
        <div className={style.messageWrapper}>
            <div className={style.message}>
                {/* <MsgCard title='新反馈' message="Markdown **bold**" time={'Jul 15 2023 00:11:43 GMT+0800'} /> */}
                {messages.sort((a: any, b: any) => b.id - a.id).map((msg: any) =>
                    <MsgCard {...msg} key={msg.id} />)}
            </div>
        </div>
        <Footer />
    </>
}
