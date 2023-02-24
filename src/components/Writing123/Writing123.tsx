import React, {SyntheticEvent, useState} from 'react';
import style from './Writing123.module.scss'
import {getTokenFromCookie, URL} from "../../utility";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ChatBox} from "../Game/ChatBox";
import {questionResponse, textResponse} from "../Game/Game";
type Prop = {
   day:number,
    content:string
}
export function Writing123 (props:Prop) {

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event: SyntheticEvent) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }

        setValidated(true);

        const payload = {
            "content1": content1,
            "content2": content2
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



    const articles = props.content.split("\n\n")

    // {chat.map((c: textResponse | questionResponse, index: number) => {
    //     return <ChatBox showArr={showArr} setShowArr={setShowArr} setChat={setChat} length={showArr.length} elicitResponse={elicitResponse} message={c} index={index} key={index}/>
    // })}
    return <div className={style.container}>
        <div className={style.title}>第{props.day}天</div>
        <div>{articles.map((article,index)=>{return <p className={style.paragraph} key={index}>{article}</p>})}</div>
        <div>
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        required
                        type="text"
                        placeholder="👤手机号"
                        value={content1}
                        onChange={e => setContent1(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={`${style.formInput}`} controlId="formBasicPassword">
                    <Form.Control
                        required
                        type="password"
                        placeholder="🔒验证码"
                        value={content2}
                        onChange={e => setContent2(e.target.value)}
                    />

                </Form.Group>
                <Button id={style.login_button} variant="primary" type="submit">
                    提交
                </Button>
            </Form>
        </div>

    </div>
}