import React, {SyntheticEvent, useEffect, useState} from 'react'
import style from './Home.module.scss'
import Nav from 'react-bootstrap/Nav';
import {Task} from "../Task/Task";
import {getUserNameFromCookie,validateLogin} from "../../utility";
export function Home() {

    const signOut = () => {
        // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/"
    }


    useEffect( () => {
        const response = async () => {
            const result = await validateLogin()
            console.log(result)
            if (result=== false) {
                signOut()
                window.location.href = "/"
            }
        }
        response().catch((e) => {
            console.log(e)
        })

    })



    return <>
        <div className={style.container}>
            <div className={style.leftPanel}>
                <Nav defaultActiveKey="/home" className={`flex-column ${style.NavBar}`}>
                    <Nav.Link href="/home" className={style.topItem}>任务列表</Nav.Link>
                    <Nav.Link eventKey="link-1">阅读反馈</Nav.Link>
                    <Nav.Link eventKey="link-2">联系我们</Nav.Link>
                </Nav>
                <div className={style.signOut} onClick={signOut}><i className="fa-solid fa-right-from-bracket"></i>登出</div>
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
                        <div className={style.topCard}>今天，是您坚持参与 本次训练营的第5天</div>
                        <div className={style.topCard}>累计得分: 2000分</div>
                    </div>
                    <div className={style.bottomTitle}>
                        任务列表
                    </div>
                    <div className={style.bottomContainer}>
                        <Task days={0} questionType={"问卷调查"} timeToFinish={30} taskURL={"https://stackoverflow.com/questions/1226714/how-to-get-the-browser-to-navigate-to-url-in-javascript"}/>
                        <Task days={1} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={2} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={3} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={4} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={5} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={6} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>
                        <Task days={7} questionType={"问卷调查"} timeToFinish={30} taskURL={""}/>

                    </div>

                </div>
            </div>
        </div>
    </>
}
