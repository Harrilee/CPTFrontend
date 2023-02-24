import React, {SyntheticEvent, useState} from 'react';
import style from './Writing6.module.scss'
import {getTokenFromCookie, URL} from "../../utility";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


type Prop = {
    day: number,
    content: string
}

export function Writing6(props: Prop) {

    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [content3, setContent3] = useState('');
    const [content4, setContent4] = useState('');
    const [a5isChecked, setA5isChecked] = useState(false);
    const [content5, setContent5] = useState('');

    const [validated, setValidated] = useState(false);
    const handleA5CheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setA5isChecked(event.target.checked);

    }

    const handleSubmit = async (event: SyntheticEvent) => {
        const form = event.currentTarget;



        event.preventDefault();
        if (!(form as HTMLInputElement).checkValidity()) {
            event.stopPropagation();
        }

        setValidated(true);


        const payload = {
            'day': props.day,
            "content1": content1,
            "content2": content2,
            "content3": content3,
            "content4": content4,
            "content5": content5,
        }
        const res = await fetch(URL + "api/writing6/", {
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

            alert(response.message)
            // window.location.href = "/home"

        } else {
            alert(response.message)
        }


    };


    const articles = props.content.split("\n\n")


    const WORD_MIN_LIMIT = 20;
    return <div className={style.container}>
        <div className={style.title}>第{props.day}天</div>
        <div>{articles.map((article, index) => {
            return <p className={style.paragraph} key={index}>{article}</p>
        })}</div>
        <div className={style.line}></div>
        <div className={style.form}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Label>1）发生了什么事情？ 【同用户第一天上传的写作内容】</Form.Label>
                <Form.Group controlId="formBasicContent1">
                    <Form.Control
                        required
                        minLength={WORD_MIN_LIMIT}
                        type="text"
                        as="textarea" rows={5}
                        value={content1}
                        onChange={e => setContent1(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        请至少输入20个字
                    </Form.Control.Feedback>

                </Form.Group>
                <Form.Group controlId="formBasicContent2">
                    <Form.Label>2）你当时有什么想法？ 【同用户第一天上传的写作内容】</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        as="textarea" rows={5}
                        value={content2}
                        minLength={WORD_MIN_LIMIT}
                        onChange={e => setContent2(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        请至少输入20个字
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicContent3">
                    <Form.Label>3）退后一步，您在您之前的写作中看到了哪些非适应性的思维？</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        as="textarea" rows={5}
                        value={content3}
                        minLength={WORD_MIN_LIMIT}
                        onChange={e => setContent3(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        请至少输入20个字
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicContent4">
                    <Form.Label>4）在学习了非适应性思维相关的知识以后，回想一下当时的场景，有没有哪些想法是您在上次写作中没有提及的呢？</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        as="textarea" rows={5}
                        value={content4}
                        minLength={WORD_MIN_LIMIT}
                        onChange={e => setContent4(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        请至少输入20个字
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicContent5">
                    <Form.Label>5）在以上您列出的所有想法里，您看到了哪些类型的非适应性思维？[多选题]</Form.Label>
                    <div className={style.checkboxContainer}>
                        <div>a) 非黑即白</div>
                        <input className={style.checkbox}
                            type="checkbox"
                            checked={a5isChecked}
                            onChange={handleA5CheckboxChange}
                        />
                    </div>
                    <div className={a5isChecked ? style.thought : style.hiddenThought}>
                        <Form.Group controlId="Content5">
                            <Form.Label>对应的想法：</Form.Label>
                            <Form.Control
                                disabled
                                required
                                type="text"
                                as="textarea" rows={3}
                                value={content5}
                                minLength={WORD_MIN_LIMIT}
                                onChange={e => setContent5(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                请至少输入20个字
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </Form.Group>
                <Button className={style.button} variant="primary" type="submit">
                    提交
                </Button>
            </Form>
        </div>

    </div>
}



