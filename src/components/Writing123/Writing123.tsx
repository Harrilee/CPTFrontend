import React, { SyntheticEvent, useState, useEffect } from 'react';
import style from './Writing123.module.scss'
import { getTokenFromCookie, URL } from "../../utility";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { TimeOutAlert } from "../TimeOutAlert/TimeOutAlert";
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import moment from 'moment';


type Prop = {
    day: number,
    content: string
}

export function Writing123(props: Prop) {

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [error, setError] = useState([false, false]);
    const [dateSaved, setDateSaved] = useState("");
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const errCheck = [false, false];
        if (content1.length < 300) {
            errCheck[0] = true;
        }
        if (content2.length < 300) {
            errCheck[1] = true;
        }
        setError(errCheck);
        const notValid = errCheck.some(x => x);


        if (!notValid) {

            const payload = {
                'day': props.day,
                "content1": content1,
                "content2": content2
            }
            const res = await fetch(URL + "api/writing123/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + getTokenFromCookie()
                },
                body: JSON.stringify(payload),

            })
            const response = await res.json()
            console.log(response)
            if (response.status === "Success") {

                alert("感谢您用写作的方式关怀自己！")
                window.location.href = "/home"

            } else {
                alert(response.message)
            }
        }
    };
    // load previous data
    useEffect(() => {
        const localDataContent1 = localStorage.getItem(window.location.href + '_content1')
        const localDataContent2 = localStorage.getItem(window.location.href + '_content2')
        if (content1 === '' && localDataContent1 !== null) {
            setContent1(localDataContent1)
        }
        if (content2 === '' && localDataContent2 !== null) {
            setContent2(localDataContent2)
        }
        if (localDataContent1 || localDataContent2) {
            setDateSaved("已自动加载上次的写作内容")
        }

    }, [])
    // save data to local storage
    useEffect(() => {
        if (content1 !== '' || content2 !== '') {
            localStorage.setItem(window.location.href + '_content1', content1)
            localStorage.setItem(window.location.href + '_content2', content2)
            setDateSaved(moment().format("HH:mm") + " 已自动保存于本地")
        }
    }, [content1, content2])


    const articles = props.content.split("\n\n")


    const WORD_MIN_LIMIT = 300;
    return <>
        <div className={style.container}>
            <Header />
            <div className={style.content}>
                <div className={style.title}>第{props.day}天</div>
                <TimeOutAlert />
                <div>{articles.map((article, index) => {
                    return <p className={style.paragraph} key={index}>{article}</p>
                })}</div>
                <div className={style.line}></div>
                <div className={style.form}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Label>发生的事情</Form.Label>
                        <Form.Group controlId="formBasicContent1">
                            <Form.Control
                                required
                                minLength={WORD_MIN_LIMIT}
                                type="text"
                                as="textarea" rows={15}
                                value={content1}
                                isInvalid={!!error[0]}
                                onChange={e => setContent1(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                请至少输入300个字
                            </Form.Control.Feedback>

                        </Form.Group>
                        <br />
                        <Form.Group controlId="formBasicContent2">
                            <Form.Label>您当时的想法</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                as="textarea" rows={15}
                                value={content2}
                                minLength={WORD_MIN_LIMIT}
                                isInvalid={!!error[1]}
                                onChange={e => setContent2(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                请至少输入300个字
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <span className={style.dateSaved}>
                                {dateSaved}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button className={style.button} variant="primary" type="submit">
                                提交
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    </>
}



