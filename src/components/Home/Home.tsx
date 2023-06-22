import React, { useEffect, useState, useRef } from 'react'
import style from './Home.module.scss'
import Nav from 'react-bootstrap/Nav'
import { Task } from '../Task/Task'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL, validateLogin } from '../../utility'
import { TimeOutAlert } from '../TimeOutAlert/TimeOutAlert'
import Overlay from 'react-bootstrap/Overlay'

export function Home() {
    const [score, setScore] = useState(0)
    const [day, setDay] = useState(0)
    const [refreshPop, setRefreshPop] = useState(false)
    const refreshRef = useRef(null)

    const signOut = () => {
        // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        window.location.href = '/'
    }

    const elicitUserState = async () => {
        const res = await fetch(URL + 'api/info/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        })
        const response = await res.json()

        console.log(response)
        if (response.status === 'Success') {
            const msg = JSON.parse(response.message)
            // console.log(msg)
            setScore(msg.score)
            setDay(msg.day)
        }
    }

    useEffect(() => {
        const response = async () => {
            const result = await validateLogin()
            console.log(result)
            if (result === false) {
                signOut()
                window.location.href = '/'
            }
        }
        response().catch(e => {
            console.log(e)
        })
    })

    useEffect(() => {
        const response = async () => {
            await elicitUserState()
        }

        response().catch(e => {
            console.log(e)
        })
    }, [day, score])

    return (
        <>
            <div className={style.container}>
                <div className={style.leftPanel}>
                    <Nav defaultActiveKey="/home" className={`flex-column ${style.NavBar}`}>
                        <Nav.Link href="/home" className={style.topItem}>
                            任务列表
                        </Nav.Link>
                        <Nav.Link eventKey="link-1">阅读反馈</Nav.Link>
                        <Nav.Link eventKey="link-2">联系我们</Nav.Link>
                    </Nav>
                    <div className={style.signOut} onClick={signOut}>
                        <i className="fa-solid fa-right-from-bracket"></i>登出
                    </div>
                </div>
                <div className={style.rightPanel}>
                    <div className={style.appBar}>
                        <div className={style.appBarContent}>用户ID：{getEncryptedUsernameFromCookie()}</div>
                        <TimeOutAlert />
                    </div>
                    <div className={style.rightContainer}>
                        <div className={style.topTitle}>欢迎回来，用户 {getEncryptedUsernameFromCookie()}</div>
                        <div className={style.topContainer}>
                            <div className={style.topCard}>
                                今天，是您坚持参与 本次训练营的第{parseInt(day.toString())}天
                            </div>
                            <div className={style.topCard}>累计得分: {score}分</div>
                        </div>
                        <div className={style.bottomTitle}>
                            任务列表{' '}
                            <span
                                className={style.refresh}
                                onClick={() => {
                                    if (!refreshPop) {
                                        elicitUserState()
                                        setRefreshPop(true)
                                        setTimeout(() => {
                                            setRefreshPop(false)
                                        }, 1000)
                                    }
                                }}
                                ref={refreshRef}
                            >
                                刷新
                            </span>
                            <Overlay target={refreshRef.current} show={refreshPop} placement="right">
                                <div
                                    style={{
                                        backgroundColor: '#5A57FF',
                                        padding: '2px 5px',
                                        color: 'white',
                                        borderRadius: '2px',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    刷新成功
                                </div>
                            </Overlay>
                        </div>
                        <div className={style.bottomContainer}>
                            <Task
                                currentDay={day}
                                days={0}
                                questionType={'问卷调查'}
                                timeToFinish={30}
                                taskURL={'/day0'}
                            />
                            <Task
                                currentDay={day}
                                days={1}
                                questionType={'问卷调查'}
                                timeToFinish={30}
                                taskURL={'/day1'}
                            />
                            <Task
                                currentDay={day}
                                days={1.1}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing1'}
                            />
                            <Task
                                currentDay={day}
                                days={2}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing2'}
                            />
                            <Task
                                currentDay={day}
                                days={3}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing3'}
                            />
                            <Task
                                currentDay={day}
                                days={4}
                                questionType={'菜鸟游戏'}
                                timeToFinish={60}
                                taskURL={'/game'}
                            />

                            <Task
                                currentDay={day}
                                days={6}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing6'}
                            />
                            <Task
                                currentDay={day}
                                days={8}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing8'}
                            />
                            <Task
                                currentDay={day}
                                days={10}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing10'}
                            />
                            <Task
                                currentDay={day}
                                days={12}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing12'}
                            />
                            <Task
                                currentDay={day}
                                days={14}
                                questionType={'菜鸟写作'}
                                timeToFinish={30}
                                taskURL={'/writing14'}
                            />
                            <Task
                                currentDay={day}
                                days={29}
                                questionType={'问卷调查'}
                                timeToFinish={30}
                                taskURL={'/day29'}
                            />
                            <Task
                                currentDay={day}
                                days={45}
                                questionType={'问卷调查'}
                                timeToFinish={30}
                                taskURL={'/day45'}
                            />
                            <Task
                                currentDay={day}
                                days={105}
                                questionType={'问卷调查'}
                                timeToFinish={30}
                                taskURL={'/day105'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
