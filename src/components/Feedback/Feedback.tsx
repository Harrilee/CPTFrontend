import React, { useEffect, useState, useRef } from 'react'
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import style from './Feedback.module.scss'
import Nav from 'react-bootstrap/Nav'
import { Task } from '../Task/Task'
import { getTokenFromCookie, getEncryptedUsernameFromCookie, URL, validateLogin, signOut } from '../../utility'


interface FeedbackProps {
    day: number
    content: string
}

export default function Feedback(props: FeedbackProps) {
    return <>
        <Header />
        <div className={style.container}>
            <div className={style.content}>
                <h1>Feedback</h1>
                <h2>Writing Day {props.day}</h2>
                <p>{props.content}</p>
            </div>
        </div>
        <Footer />
    </>
}