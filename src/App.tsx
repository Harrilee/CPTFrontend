import React, { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import { Login } from './components/Login/Login'
import { Home } from './components/Home/Home'
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

// export const UserContext = createContext({ value: {user: "0", setUser: (user: string) => {}} })
function App() {
    // const [user, setUser] = useState("0")
    // const value = {user, setUser}

    const PrivateWrapper = ({ child }: { child: JSX.Element }) => {
        // const _user = useContext(UserContext).value.user;
        const ua = new UAParser(window.navigator.userAgent)
        const isMobile = ua.getDevice().type === 'mobile'
        if (isMobile) {
            return <Navigate to="/" />
        }
        const cookie = document.cookie.split(';').map(x => x.trim())
        const token = cookie.find(x => x.startsWith('token='))
        return token !== undefined ? child : <Navigate to="/" />
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

    // return <UserContext.Provider value={{value}}>
    return (
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
                <Route path="home/" element={<PrivateWrapper child={<Home />} />}></Route>
                <Route path="welcome/" element={<PrivateWrapper child={<Welcome />} />}></Route>
                <Route path="game/" element={<PrivateWrapper child={<Game />} />}></Route>
                <Route
                    path="day0/"
                    element={
                        <PrivateWrapper
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
                        <PrivateWrapper
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
                    element={<PrivateWrapper child={<Writing123 day={1} content={CONTENT_WRITING_DAY1} />} />}
                />
                <Route
                    path="writing2/"
                    element={<PrivateWrapper child={<Writing123 day={2} content={CONTENT_WRITING_DAY2} />} />}
                />
                <Route
                    path="writing3/"
                    element={<PrivateWrapper child={<Writing123 day={3} content={CONTENT_WRITING_DAY3} />} />}
                />
                <Route
                    path="writing6/"
                    element={<PrivateWrapper child={<Writing6810 day={6} content={CONTENT_WRITING_DAY6} />} />}
                />
                <Route
                    path="feedback6/"
                    element={<PrivateWrapper child={<Feedback day={6} />} />}
                />
                <Route
                    path="writing8/"
                    element={<PrivateWrapper child={<Writing6810 day={8} content={CONTENT_WRITING_DAY8} />} />}
                />
                <Route path="feedback8/" element={<PrivateWrapper child={<Feedback day={8} />} />} />
                <Route
                    path="writing10/"
                    element={<PrivateWrapper child={<Writing6810 day={10} content={CONTENT_WRITING_DAY10} />} />}
                />
                <Route path="feedback10/" element={<PrivateWrapper child={<Feedback day={10} />} />} />
                <Route
                    path="writing12/"
                    element={<PrivateWrapper child={<Writing1214 day={12} content={CONTENT_WRITING_DAY12} />} />}
                />
                <Route path="feedback12/" element={<PrivateWrapper child={<Feedback day={12} />} />} />
                <Route
                    path="writing14/"
                    element={<PrivateWrapper child={<Writing1214 day={14} content={CONTENT_WRITING_DAY14} />} />}
                />
                <Route path="feedback14/" element={<PrivateWrapper child={<Feedback day={14} />} />} />
                <Route path="video4/" element={<PrivateWrapper child={<Video />} />} />
                <Route
                    path="day29/"
                    element={
                        <PrivateWrapper
                            child={
                                <Survey
                                    url={`https://nyu.qualtrics.com/jfe/form/SV_0fEtLt7hh5za4BM?userId=${getEncryptedUsernameFromCookie()}`}
                                />
                            }
                        />
                    }
                />
                <Route
                    path="day45/"
                    element={
                        <PrivateWrapper
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
                        <PrivateWrapper
                            child={
                                <Survey
                                    url={`https://nyu.qualtrics.com/jfe/form/SV_4HJi8oX4onYNtPg?userId=${getEncryptedUsernameFromCookie()}`}
                                />
                            }
                        />
                    }
                />
                <Route path='message/' element={<PrivateWrapper child={<Message />} />} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
