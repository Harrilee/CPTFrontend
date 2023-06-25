import React, {useEffect, useState} from "react";
import {getTokenFromCookie, parseJwt, signOut, timeOut, URL} from "../../utility";
import {Alert} from "react-bootstrap";
import style from './TimeOutAlert.module.scss'

export function TimeOutAlert() {
    const [show, setShow] = useState(true);
    const [timeToExpire, setTimeToExpire] = useState(0);


    const clickHandler = async () => {

        const res = await fetch(URL + "api/keeplogin/", {
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

            document.cookie = "token=" + JSON.parse(response.message).access;
            console.log(getTokenFromCookie())

        }else{
            alert(response.message)
        }
    }

    useEffect(() => {
        const token = parseJwt(getTokenFromCookie());
        const timeToExpire = Math.floor((token.exp - Math.floor(Date.now() / 1000)));
        setTimeToExpire(timeToExpire)

        if (timeToExpire <= timeOut) { // 28800 max
            setShow(true)
        }else{
            setShow(false)
            signOut()

        }

        const interval = setInterval(()=>{
            setTimeToExpire(Math.floor((token.exp - Math.floor(Date.now() / 1000))))
        },1000)

        return () => clearInterval(interval)
    }, [show,timeToExpire])

    return <Alert className={style.alert} onClick={clickHandler} show={show}  variant='danger'>
        <div>您在{timeToExpire}秒后会自动登出</div>
        <div>请点击我保持登录状态</div>
        </Alert>;
}