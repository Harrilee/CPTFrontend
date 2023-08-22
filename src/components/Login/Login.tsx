import React, {SyntheticEvent, useContext, useEffect, useState} from 'react'
import style from './Login.module.scss'
import { getTokenFromCookie, URL } from '../../utility'
import { UAParser } from 'ua-parser-js'


export function Login() {
    const [phone, setPhone] = useState('')
    const [pwd, setPwd] = useState('')
    const [validated, setValidated] = useState(false)
    const [smsState, setSmsState] = useState(false)
    const [smsText, setSmsText] = useState('发送验证码')
    const [errorMsg, setErrorMsg] = useState('')
    const ua = new UAParser(window.navigator.userAgent)
    const isMobile = ua.getDevice().type === 'mobile'

    // If logged in, redirect to welcome page
    const cookie = document.cookie.split(';').map(x => x.trim())
    const token = cookie.find(x => x.startsWith('token='))


    const getSMS = async () => {
        setSmsState(true)
        setSmsText('发送中...')
        setErrorMsg('')
        const payload = {
            phoneNumber: phone,
        }

        const res = await fetch(URL + 'api/sms/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const response = await res.json()
        console.log(response)
        if (response.status === 'Success') {
            const start = new Date().getTime()
            setSmsText('30秒后可重试')
            const ref = setInterval(() => {
                const remain = 30 - Math.floor((new Date().getTime() - start) / 1000)
                setSmsText(remain + '秒后可重试')
            }, 1000)
            setTimeout(() => {
                setSmsState(false)
                clearInterval(ref)
                setSmsText('发送验证码')
            }, 30000)
        } else {
            const start = new Date().getTime()
            setErrorMsg(response.message)
            const ref = setInterval(() => {
                const remain = 15 - Math.floor((new Date().getTime() - start) / 1000)
                setSmsText('失败!' + remain + '秒重试')
            }, 1000)

            setTimeout(() => {
                setSmsState(false)
                clearInterval(ref)
                setSmsText('发送验证码')
            }, 15000)
        }
    }
    const handleSubmit = async (event: SyntheticEvent) => {
        const form = event.currentTarget
        event.preventDefault()
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation()
        }

        setValidated(true)

        const payload = {
            phoneNumber: phone,
            passcode: pwd,
        }
        const res = await fetch(URL + 'api/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const response = await res.json()
        console.log(response)
        if (response.status === 'Success') {
            document.cookie = 'token=' + JSON.parse(response.message).access
            // document.cookie = "username=" + phone;
            // update UserContext
            console.log(getTokenFromCookie())

            window.location.href = "/welcome"
        } else {
            setErrorMsg(response.message)
        }
    }

    return (
        <>
            <div className={style.container}>
                {/* <div>
                    <img src="/rainbow.png" alt="上海纽约大学压力与健康研究" className={style.image} />
                </div> */}
                <div className={style.text}>上海纽约大学压力与健康研究</div>
                {isMobile ? (
                    <div className={style.mobileText}>手机端暂不支持登录，请使用电脑端登录</div>
                ) : (
                    <div className={style.formGroup}>
                        <div className={style.inputGroupWrapper}>
                            <div className={style.inputGroup}>
                                <img src="/user.svg" alt="phone" className={style.icon} width="20" height={'20'} />
                                <input
                                    type="text"
                                    placeholder="手机号"
                                    className={style.input}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={style.inputGroupWrapper}>
                            <button
                                disabled={smsState}
                                className={style.smsButton + ' ' + style.smsButtonHidden}
                                onClick={getSMS}
                            >
                                {smsText}
                            </button>
                            <div className={style.inputGroup}>
                                <img src="/lock.svg" alt="password" className={style.icon} width="20" height={'20'} />
                                <input
                                    type="password"
                                    placeholder="验证码"
                                    className={style.input}
                                    value={pwd}
                                    onChange={e => setPwd(e.target.value)}
                                />
                            </div>
                            <button disabled={smsState} className={style.smsButton} onClick={getSMS}>
                                {smsText}
                            </button>
                        </div>
                        <div className={style.errorMsg}>{errorMsg}</div>
                        <button
                            className={style.loginButton + ' ' + style.smsButton}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            登录
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}