import React, { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import { Login } from './components/Login/Login'
import { Home, AcsMngr, tasks_controlgroup, tasks_expgroup, Rule } from './components/Home/Home'
import Spinner from 'react-bootstrap/Spinner';
import home_style from './components/Home/Home.module.scss'
import './App.scss'
import { getEncryptedUsernameFromCookie, cloudWatchLogger } from './utility'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { UAParser } from 'ua-parser-js'

import { Game } from './components/Game/Game'
import { Survey } from './components/Surveys/Survey'
import { Writing123 } from './components/Writing123/Writing123'
import {
    CONTENT_WRITING_DAY1,
    CONTENT_WRITING_DAY10,
    CONTENT_WRITING_DAY12,
    CONTENT_WRITING_DAY14,
    CONTENT_WRITING_DAY2,
    CONTENT_WRITING_DAY3,
    CONTENT_WRITING_DAY6,
    CONTENT_WRITING_DAY8,
} from './content'
import { Writing6810 } from './components/Writing6/Writing6810'
import { Writing1214 } from './components/Writing1214/Writing1214'
import Video from './components/Video'
import moment from 'moment'
import Welcome from "./components/Welcome/Welcome";
import Feedback from './components/Feedback/Feedback';
import Message from './components/Message'
import { TimeOutAlert } from './components/TimeOutAlert/TimeOutAlert'

import { getTokenFromCookie, URL } from './utility'

// export const UserContext = createContext({ value: {user: "0", setUser: (user: string) => {}} })
function App() {
    // const [user, setUser] = useState("0")
    // const value = {user, setUser}

    const PrivateWrapper = ({ taskDay, child }: { taskDay: number | null, child: JSX.Element }) => {
        const [loading, setLoading] = useState(true)
        const [info, setInfo] = useState({
            day: NaN,
            score: NaN,
            startDate: moment().format('YYYY-MM-DD'),
            banFlag: false,
            banReason: "",
            expGroup: "",

            feedbackDay6: "",
            feedbackDay6Viewed: false,

            feedbackDay8: "",
            feedbackDay8Viewed: false,

            feedbackDay10: "",
            feedbackDay10Viewed: false,

            feedbackDay12: "",
            feedbackDay12Viewed: false,

            feedbackDay14: "",
            feedbackDay14Viewed: false,
        })
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
            if (response.status === 'Success') {
                const msg = JSON.parse(response.message)
                setInfo(msg)
                setLoading(false)
            }
        }
        useEffect(() => {
            const response = async () => {
                await elicitUserState()
            }

            response().catch(e => {
                console.error(e)
            })
        }, [])
        const ua = new UAParser(window.navigator.userAgent)
        const isMobile = ua.getDevice().type === 'mobile'
        if (isMobile) {
            return <Navigate to="/" />
        }
        const cookie = document.cookie.split(';').map(x => x.trim())
        const token = cookie.find(x => x.startsWith('token='))
        if (token === undefined) {
            return <Navigate to="/" />
        }
        if (loading) {
            return (<div className={home_style.loading
            }>
                <Spinner id={home_style.spinner} animation="border" role="status" />
            </div >)
        }

        const acsMngr = new AcsMngr(info)
        if (taskDay === null) {
            return token !== undefined ? child : <Navigate to="/" />
        }
        let rule = null
        if (info.expGroup === 'Waitlist') {
            rule = tasks_controlgroup.find(x => x.day === taskDay)?.rule
        } else {
            rule = tasks_expgroup.find(x => x.day === taskDay)?.rule
        }
        const banReaons = acsMngr.checkAccess(taskDay, rule as Rule)
        const finished = info.day > taskDay
        console.log(
            banReaons, finished, ([1.1, 2, 3, 6, 8, 10, 12, 14].indexOf(taskDay) !== -1)
        )
        if (banReaons === true || (finished && ([1.1, 2, 3, 6, 8, 10, 12, 14].indexOf(taskDay) !== -1))) {
            return child
        } else {
            return <>
                <h1>404</h1>
                <p>{JSON.stringify(banReaons)}</p></>
        }
    }

    useEffect(() => {
        cloudWatchLogger('enter_page', '')
        window.localStorage.setItem('enterDate', moment().toString())
        document.addEventListener('visibilitychange', function logData() {
            if (document.visibilityState === 'hidden') {
                cloudWatchLogger(
                    'leave_page',
                    (Number(moment().toDate()) - Number(moment(window.localStorage.getItem('enterDate')).toDate())) /
                    1000 +
                    's'
                )
            } else {
                if (document.visibilityState === 'visible') {
                    cloudWatchLogger('enter_page', '')
                    window.localStorage.setItem('enterDate', moment().toString())
                }
            }
        })
    }, [])

    useEffect(() => {
        const url_path = location.pathname
        if (url_path !== '/') {
            const linkDomObj = document.createElement('link')
            linkDomObj.rel = "apple-touch-icon"
            linkDomObj.href = '/rainbow.ong'
            document.head.appendChild(linkDomObj)
            const iconDomObj = document.createElement('link')
            iconDomObj.rel = 'icon'
            iconDomObj.href = '/rainbow.png'
            document.head.appendChild(iconDomObj)
            return () => {
                try {
                    document.removeChild(linkDomObj)
                    document.removeChild(iconDomObj)
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
    }, [])

    // return <UserContext.Provider value={{value}}>
    return (
        <>
            <TimeOutAlert />
            <BrowserRouter>
                <style>
                    {`
                .was-validated textarea {
                    background-image: none !important;
                }
            `}
                </style>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="home/" element={<PrivateWrapper taskDay={null} child={<Home />} />}></Route>
                    <Route path="welcome/" element={<PrivateWrapper taskDay={null} child={<Welcome />} />}></Route>
                    <Route path="game1/" element={<PrivateWrapper taskDay={4.1} child={<Game />} />}></Route>
                    <Route path="game2/" element={<PrivateWrapper taskDay={5} child={<Game />} />}></Route>
                    <Route
                        path="day0/"
                        element={
                            <PrivateWrapper taskDay={0}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_b3oXwg0uErHbNqK?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="day1/"
                        element={
                            <PrivateWrapper taskDay={1}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_4Z9HRQoFIEaFKei?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="writing1/"
                        element={<PrivateWrapper taskDay={1.1} child={<Writing123 day={1} content={CONTENT_WRITING_DAY1} />} />}
                    />
                    <Route
                        path="writing2/"
                        element={<PrivateWrapper taskDay={2} child={<Writing123 day={2} content={CONTENT_WRITING_DAY2} />} />}
                    />
                    <Route
                        path="writing3/"
                        element={<PrivateWrapper taskDay={3} child={<Writing123 day={3} content={CONTENT_WRITING_DAY3} />} />}
                    />
                    <Route
                        path="writing6/"
                        element={<PrivateWrapper taskDay={6} child={<Writing6810 day={6} content={CONTENT_WRITING_DAY6} />} />}
                    />
                    <Route
                        path="feedback6/"
                        element={<PrivateWrapper taskDay={7} child={<Feedback day={6} />} />}
                    />
                    <Route
                        path="writing8/"
                        element={<PrivateWrapper taskDay={8} child={<Writing6810 day={8} content={CONTENT_WRITING_DAY8} />} />}
                    />
                    <Route path="feedback8/" element={<PrivateWrapper taskDay={9} child={<Feedback day={8} />} />} />
                    <Route
                        path="writing10/"
                        element={<PrivateWrapper taskDay={10} child={<Writing6810 day={10} content={CONTENT_WRITING_DAY10} />} />}
                    />
                    <Route path="feedback10/" element={<PrivateWrapper taskDay={11} child={<Feedback day={10} />} />} />
                    <Route
                        path="writing12/"
                        element={<PrivateWrapper taskDay={12} child={<Writing1214 day={12} content={CONTENT_WRITING_DAY12} />} />}
                    />
                    <Route path="feedback12/" element={<PrivateWrapper taskDay={13} child={<Feedback day={12} />} />} />
                    <Route
                        path="writing14/"
                        element={<PrivateWrapper taskDay={14} child={<Writing1214 day={14} content={CONTENT_WRITING_DAY14} />} />}
                    />
                    <Route path="feedback14/" element={<PrivateWrapper taskDay={15} child={<Feedback day={14} />} />} />
                    <Route path="video4/" element={<PrivateWrapper taskDay={4} child={<Video />} />} />
                    <Route
                        path="day29ct/"
                        element={
                            <PrivateWrapper taskDay={29}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_0fEtLt7hh5za4BM?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="day29wl/"
                        element={
                            <PrivateWrapper taskDay={29}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_cRXdri5diJ1hVqK?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="day45/"
                        element={
                            <PrivateWrapper taskDay={45}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_9TQwYhtFVafdQma?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route
                        path="day105/"
                        element={
                            <PrivateWrapper taskDay={105}
                                child={
                                    <Survey
                                        url={`https://nyu.qualtrics.com/jfe/form/SV_4HJi8oX4onYNtPg?userId=${getEncryptedUsernameFromCookie()}`}
                                    />
                                }
                            />
                        }
                    />
                    <Route path='message/' element={<PrivateWrapper taskDay={null} child={<Message />} />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </BrowserRouter></>
    )
}
export default App
