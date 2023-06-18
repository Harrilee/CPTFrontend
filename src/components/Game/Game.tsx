import style from './Game.module.scss'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL } from '../../utility'
import user_avatar from './avatar/User.png'
import supervisor_avatar from './avatar/Supervisor.png'
import client1_avatar from './avatar/Client 1.png'
import client2_avatar from './avatar/Client 2.png'
import client3_avatar from './avatar/Client 3.png'
import client4_avatar from './avatar/Client 4.png'
import client5_avatar from './avatar/Client 5.png'
import client6_avatar from './avatar/Client 6.png'
import client7_avatar from './avatar/Client 7.png'
import client8_avatar from './avatar/Client 8.png'
import client9_avatar from './avatar/Client 9.png'
import client10_avatar from './avatar/Client 10.png'
import client11_avatar from './avatar/Client 11.png'
import client12_avatar from './avatar/Client 12.png'
import client13_avatar from './avatar/Client 13.png'
import client14_avatar from './avatar/Client 14.png'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Draggable from 'react-draggable'
import ModalDialog from 'react-bootstrap/ModalDialog'
import React from 'react'
import { ChatBox } from './ChatBox'
import { TimeOutAlert } from '../TimeOutAlert/TimeOutAlert'

const avatars = [
    client1_avatar,
    client2_avatar,
    client3_avatar,
    client4_avatar,
    client5_avatar,
    client6_avatar,
    client7_avatar,
    client8_avatar,
    client9_avatar,
    client10_avatar,
    client11_avatar,
    client12_avatar,
    client13_avatar,
    client14_avatar,
]

class DraggableModalDialog extends React.Component {
    render() {
        return (
            <Draggable handle=".modal-title">
                <ModalDialog {...this.props} />
            </Draggable>
        )
    }
}

export interface textResponse {
    speaker: string
    text: string
}

export interface questionResponse extends textResponse {
    choices: string
}

export type choicePayload = {
    choice: string
}

interface Props {
    day: number
}

interface GuestProps {
    guestList: Array<any>
    setGuestList: any
    day: number
}

const GuestList = (props: GuestProps) => {
    const { guestList, setGuestList, day } = props
    const updateGuestList = async () => {
        const scenariosRes = await fetch(URL + 'api/game/scenarios/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        })
        let scenarios = await scenariosRes.json()
        scenarios = scenarios.scenarios
        if (day === 1) {
            scenarios = scenarios.filter((d: any, idx: number) => idx <= 6)
        } else {
            scenarios = scenarios.filter((d: any, idx: number) => idx >= 7)
        }
        setGuestList(scenarios)
    }
    useEffect(() => {
        updateGuestList()
    }, [])
    return (
        <>
            {
                <div className={style.clients}>
                    {guestList.map((guest: any, idx: number) => (
                        <div className={style.clientInfo} key={guest.name}>
                            <div>
                                <img
                                    className={style.avatar}
                                    src={avatars[guest.true_id]}
                                    alt={`来访者${guest.order + 1}头像`}
                                />
                            </div>
                            <div id={`client${guest.order + 1}`} className={style.clientName}>
                                {guest.name}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export function Game(props: Props) {
    const day = props.day
    const [chat, setChat] = useState<any>([])
    const [score, setScore] = useState(0)
    const [displayID, setDisplayID] = useState(0)
    const [realID, setRealID] = useState(0)
    const [showArr, setShowArr] = useState<boolean[]>([])
    const visitorCount = 14
    const [guestList, setGuestList] = useState<any>([])

    const clientColorHighlight = () => {
        for (let i = 0; i < visitorCount; i++) {
            const visitorElement = document.querySelector('#client' + (i + 1)) as HTMLElement
            if (visitorElement) {
                visitorElement.style.color = ''
            }
        }
        const visitorElement = document.querySelector('#client' + (displayID + 1)) as HTMLElement
        if (visitorElement) {
            visitorElement!.style.color = '#ff8300'
        }
    }
    const elicitResponse = async (payload: choicePayload = { choice: '' }) => {
        console.log(payload)
        const res = await fetch(URL + 'api/game/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
            body: JSON.stringify(payload),
        })

        const response = await res.json()

        // exit game at day 7
        if (response.scenario_display_id === 7 && day == 1) {
            window.location.href = '/home'
        }
        console.log(response)
        const msgs = response.responses
        const score = response.score
        const newDisplayID = response.scenario_display_id
        const realID = response.scenario_true_id

        const newshowArr = new Array<boolean>(msgs.length).fill(false)
        newshowArr[0] = true

        // if (newDisplayID!==displayID){
        //     const falseShowArr = new Array<boolean>(showArr.length).fill(false)
        //     setShowArr(showArr)
        //
        // }

        setScore(score)
        setDisplayID(newDisplayID)
        setRealID(realID)
        setShowArr(oldArr => [...oldArr, ...newshowArr])
        setChat((chat: any) => [...chat, ...msgs])
    }

    useEffect(() => {
        const response = async () => {
            await elicitResponse()
        }

        response().catch(e => {
            console.log(e)
        })
    }, [])

    useEffect(() => {
        clientColorHighlight()
        const element = document.querySelector('#chat_content')
        element!.scrollTop = element!.scrollHeight
        console.log('rerender')
    })

    return (
        <>
            <div className={style.container}>
                <div className={style.leftPanel}>
                    <div className={style.userInfo}>
                        <div className={style.avatar}>
                            <img className={style.avatar} src={user_avatar} alt={'用户头像'} />
                        </div>
                        <div className={style.username}>{getEncryptedUsernameFromCookie()}</div>
                    </div>
                    <div className={style.score}>
                        分数：{score}
                        <br />第{day}部分
                    </div>
                    <div className={style.clientsHeader}>来访者列表</div>
                    <GuestList guestList={guestList} setGuestList={setGuestList} day={day} />
                </div>
                <div className={style.rightPanel}>
                    <div className={style.header}>
                        <div>{guestList[displayID - (day === 1 ? 0 : 7)]?.name}</div>
                        <TimeOutAlert />
                    </div>
                    <div className={style.content} id={'chat_content'}>
                        {chat.map((c: textResponse | questionResponse, index: number) => {
                            return (
                                <ChatBox
                                    showArr={showArr}
                                    setShowArr={setShowArr}
                                    setChat={setChat}
                                    length={showArr.length}
                                    elicitResponse={elicitResponse}
                                    message={c}
                                    index={index}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}