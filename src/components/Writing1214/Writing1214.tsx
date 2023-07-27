import React, { SyntheticEvent, useState, useEffect } from 'react';
import style from './Writing1214.module.scss'
import {getTokenFromCookie, URL} from "../../utility";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';



type Prop = {
    day: number,
    content: string
}

export function Writing1214(props: Prop) {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>();

    useEffect(() => {
        fetch(URL + 'api/info/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getTokenFromCookie(),
            },
        }).then(res => res.json()).then(data => {
            const day = JSON.parse(data.message).day;
            if (day <= props.day) { // task not done
                setLoading(false);
            } else {
                fetch(URL + `api/writing123?day=${props.day}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + getTokenFromCookie()
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setContent(data.message)
                        setLoading(false);
                    })
            }
        })
    }, [])

    const Main = () => {
        const [content1, setContent1] = useState('');

        const [validated, setValidated] = useState(false);
        const [dateSaved, setDateSaved] = useState('');
        const handleSubmit = async (event: SyntheticEvent) => {
            event.preventDefault();
            const form = event.currentTarget;

            const notValid = !(form as HTMLInputElement).checkValidity();

            if (notValid) {
                event.preventDefault();
                event.stopPropagation();
            }

            console.log(notValid);

            setValidated(true);

            if (!notValid) {

                const payload = {
                    'day': props.day,
                    "content1": content1,

                }
                const res = await fetch(URL + "api/writing1214/", {
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
            // if already answered, load previous data
            if (content) {
                setContent1(content)
            }

            // else load local storage
            const localDataContent1 = localStorage.getItem(window.location.href + '_content1')
            if (content1 === '' && localDataContent1 !== null) {
                setContent1(localDataContent1)
            }
            if (localDataContent1) {
                setDateSaved("已自动加载上次的写作内容")
            }

        }, [content])
        // save data to local storage
        useEffect(() => {
            if (content) {
                setDateSaved("")
            }
            if (!content && content1 !== '' && content1 !== localStorage.getItem(window.location.href + '_content1')) {
                localStorage.setItem(window.location.href + '_content1', content1)
                setDateSaved(moment().format("HH:mm") + " 已自动保存于本地")
            }
        }, [content, content1])


        const articles = props.content.split("\n\n")


        const WORD_MIN_LIMIT = 300;
        return <div className={style.content}>
            <div className={style.title}>第{props.day}天</div>
            <div>{articles.map((article, index) => {
                return <p className={style.paragraph} key={index}>{article}</p>
            })}</div>
            <div className={style.line}></div>
            <div className={style.form}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Label>写作练习</Form.Label>
                    <Form.Group controlId="formBasicContent1">
                        <Form.Control
                            required
                            minLength={WORD_MIN_LIMIT}
                            type="text"
                            as="textarea" rows={15}
                            value={content1}
                            disabled={content}
                            onChange={e => setContent1(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            请至少输入300个字
                        </Form.Control.Feedback>

                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className={style.dateSaved}>
                            {dateSaved}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <Button className={style.button} variant="primary" type="submit" disabled={content}>
                            提交
                        </Button>
                        <Button className={style.button} variant="primary" onClick={() => { window.location.href = 'home' }}>
                            返回
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    }

    return <div className={style.container}>
        <Header />
        {
            loading ?
                <div className={style.loading}>
                    <Spinner id={style.spinner} animation="border" role="status" />
                </div>
                :
                <Main />
        }
        <Footer />
    </div>
}



