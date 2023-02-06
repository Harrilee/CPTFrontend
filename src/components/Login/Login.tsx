import React, {SyntheticEvent, useContext, useState} from 'react'
import style from './Login.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {URL} from "../../utility";


// let res = await fetch(ip_addr + "/api/register", {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload),
//     redirect: 'follow'
// })
// const response = await res.json()
// console.log(response)
// alert(response.message)
//
// return Promise.reject(response.message)

export function Login() {

    const [phone, setPhone] = useState('');
    const [pwd, setPwd] = useState('');
    const [validated, setValidated] = useState(false);

    const getSMS = async () => {
        let payload = {
            "phoneNumber": phone
        }
        let res = await fetch(URL + "api/sms/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),

        })
        const response = await res.json()
        console.log(response)

    }
    const handleSubmit = async (event: SyntheticEvent) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }

        setValidated(true);

        let payload = {
            "phoneNumber": phone,
            "passcode": pwd
        }
        let res = await fetch(URL + "api/login/", {
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
            document.cookie = "username=" + phone;
            // update UserContext




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
                            type="text"
                            placeholder="🔒验证码"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                        />
                        <Button id={style.sms_button} variant="primary" onClick={getSMS}>发送验证码</Button>
                    </Form.Group>
                    <Button id={style.login_button} variant="primary" type="submit">
                        登录
                    </Button>
                </Form>
            </div>
        </div>
    </>
}