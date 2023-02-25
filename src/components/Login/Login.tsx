import React, {SyntheticEvent, useContext, useEffect, useState} from 'react'
import style from './Login.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {getTokenFromCookie, URL} from "../../utility";


export function Login() {

    const [phone, setPhone] = useState('');
    const [pwd, setPwd] = useState('');
    const [validated, setValidated] = useState(false);
    const [smsState, setSmsState] = useState(false);
    const [smsText, setSmsText] = useState("发送验证码");

    const getSMS = async () => {
        setSmsState(true);
        setSmsText("发送中...");
        const payload = {
            "phoneNumber": phone
        }

        const res = await fetch(URL + "api/sms/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),

        })
        const response = await res.json()
        console.log(response)
        if (response.status === "Success") {
            const start = new Date().getTime()
            setSmsText("30秒后可重试")
            const ref = setInterval(() => {
                const remain = 30 - Math.floor((new Date().getTime() - start) / 1000)
                setSmsText(remain+"秒后可重试")
            },1000)
            setTimeout(() => {
                setSmsState(false)
                clearInterval(ref)
                setSmsText("发送验证码")
            }, 30000)
        }else{
            const start = new Date().getTime()
            const ref = setInterval(() => {
                const remain = 15 - Math.floor((new Date().getTime() - start) / 1000)
                setSmsText("失败!"+remain+"秒重试")
            },1000)

            setTimeout(() => {
                setSmsState(false);
                clearInterval(ref)
                setSmsText("发送验证码")
            }, 15000)
        }

    }
    const handleSubmit = async (event: SyntheticEvent) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }

        setValidated(true);

        const payload = {
            "phoneNumber": phone,
            "passcode": pwd
        }
        const res = await fetch(URL + "api/login/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),

        })
        const response = await res.json()
        console.log(response)
        if (response.status === "Success") {

            document.cookie = "token=" + JSON.parse(response.message).access;
            // document.cookie = "username=" + phone;
            // update UserContext
            console.log(getTokenFromCookie())




            window.location.href = "/home"
        }else{
            alert(response.message)
        }
    };


    return <>
        <div className={style.container}>
            <div>
                <img src="/rainbow.png" alt="上海纽约大学压力与心理健康研究" className={style.image}/>
            </div>
            <div className={style.text}>
                上海纽约大学压力与心理健康研究
            </div>
            <div>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            required
                            type="text"
                            placeholder="👤手机号"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={`${style.formInput}`} controlId="formBasicPassword">
                        <Form.Control
                            required
                            type="password"
                            placeholder="🔒验证码"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                        />
                        <Button id={style.sms_button} variant="primary" disabled={smsState} onClick={getSMS}>{smsText}</Button>
                    </Form.Group>
                    <Button id={style.login_button} variant="primary" type="submit">
                        登录
                    </Button>
                </Form>
            </div>
        </div>
    </>
}