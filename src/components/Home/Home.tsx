import React, {SyntheticEvent, useEffect, useState} from 'react'
import style from './Home.module.scss'
import Nav from 'react-bootstrap/Nav';
import {Task} from "../Task/Task";
import {getTokenFromCookie, getUserNameFromCookie, URL, validateLogin} from "../../utility";
import {choicePayload} from "../Game/Game";

export function Home() {

    const [score, setScore] = useState(0)
    const [day, setDay] = useState(1)


    const signOut = () => {
        // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/"
    }

    const elicitUserState = async () => {


        const res = await fetch(URL + "info/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + getTokenFromCookie()
            },

        })
        const response = await res.json()

        console.log(response)
        if (response.status === "Success") {
            const msg = JSON.parse(response.message);
            console.log(msg)
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
                window.location.href = "/"
            }
        }
        response().catch((e) => {
            console.log(e)
        })

    })

    useEffect(() => {

        const response = async () => {
            await elicitUserState()
        }

        response().catch((e) => {
            console.log(e)
        })

    }, [day, score])


    return <>
        <div className={style.container}>
            <div className={style.leftPanel}>
                <Nav defaultActiveKey="/home" className={`flex-column ${style.NavBar}`}>
                    <Nav.Link href="/home" className={style.topItem}>任务列表</Nav.Link>
                    <Nav.Link eventKey="link-1">阅读反馈</Nav.Link>
                    <Nav.Link eventKey="link-2">联系我们</Nav.Link>
                </Nav>
                <div className={style.signOut} onClick={signOut}><i className="fa-solid fa-right-from-bracket"></i>登出
                </div>
            </div>
            <div className={style.rightPanel}>
                <div className={style.appBar}>
                    <div className={style.appBarContent}>{getUserNameFromCookie()}</div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.topTitle}>
                        欢迎回来，{getUserNameFromCookie()}
                    </div>
                    <div className={style.topContainer}>
                        <div className={style.topCard}>今天，是您坚持参与 本次训练营的第{day}天</div>
                        <div className={style.topCard}>累计得分: {score}分</div>
                    </div>
                    <div className={style.bottomTitle}>
                        任务列表
                    </div>
                    <div className={style.bottomContainer}>
                        <Task currentDay={day} days={0} questionType={"问卷调查"} timeToFinish={30} taskURL={"/day0"}/>
                        <Task currentDay={day} days={1} questionType={"问卷调查"} timeToFinish={30} taskURL={"/day1"}/>
                        <Task currentDay={day} days={1} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing1"}/>
                        <Task currentDay={day} days={2} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing2"}/>
                        <Task currentDay={day} days={3} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing3"}/>
                        <Task currentDay={day} days={4} questionType={"菜鸟游戏"} timeToFinish={30} taskURL={"/game"}/>
                        <Task currentDay={day} days={6} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing6"}/>
                        <Task currentDay={day} days={8} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing8"}/>
                        <Task currentDay={day} days={10} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing10"}/>
                        <Task currentDay={day} days={12} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing12"}/>
                        <Task currentDay={day} days={14} questionType={"菜鸟写作"} timeToFinish={30}
                              taskURL={"/writing14"}/>
                        <Task currentDay={day} days={29} questionType={"问卷调查"} timeToFinish={30}
                              taskURL={"/day29"}/>
                        <Task currentDay={day} days={45} questionType={"问卷调查"} timeToFinish={30}
                              taskURL={"/day45"}/>
                        <Task currentDay={day} days={105} questionType={"问卷调查"} timeToFinish={30}
                              taskURL={"/day105"}/>

                    </div>

                </div>
            </div>
        </div>
    </>
}
