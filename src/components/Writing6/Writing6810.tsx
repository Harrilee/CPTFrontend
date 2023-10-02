import React, { SyntheticEvent, useState, useEffect, useRef } from 'react';
import style from './Writing6810.module.scss'
import {getTokenFromCookie, URL} from "../../utility";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Header } from '../Layout/Header'
import { Footer } from '../Layout/Footer'
import Markdown from 'markdown-to-jsx';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

type Prop = {
    day: number,
    content: string
}

export function Writing6810(props: Prop) {
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
                fetch(URL + `api/writing6810/?day=${props.day}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + getTokenFromCookie()
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        data.message = JSON.parse(data.message)
                        setContent(data.message)
                        setLoading(false);
                    })
            }
        })
    }, [])

    const Main = () => {
        const [content1, setContent1] = useState('加载中');
        const [content2, setContent2] = useState('加载中');
        const [content3, setContent3] = useState('');
        const [content4, setContent4] = useState('');
        const [fiveAisChecked, setFiveAisChecked] = useState(false);
        const [content5a, setContent5a] = useState('');
        const [fiveBisChecked, setFiveBisChecked] = useState(false);
        const [content5b, setContent5b] = useState('');
        const [fiveCisChecked, setFiveCisChecked] = useState(false);
        const [content5c, setContent5c] = useState('');
        const [fiveDisChecked, setFiveDisChecked] = useState(false);
        const [content5d, setContent5d] = useState('');
        const [fiveEisChecked, setFiveEisChecked] = useState(false);
        const [content5e, setContent5e] = useState('');
        const [fiveFisChecked, setFiveFisChecked] = useState(false);
        const [content5f, setContent5f] = useState('');
        const [fiveGisChecked, setFiveGisChecked] = useState(false);
        const [content5g, setContent5g] = useState('');
        const [fiveHisChecked, setFiveHisChecked] = useState(false);

        const [sixAisChecked, setsixAisChecked] = useState(false);
        const [content6a, setContent6a] = useState('');
        const [sixBisChecked, setsixBisChecked] = useState(false);
        const [content6b, setContent6b] = useState('');
        const [sixCisChecked, setsixCisChecked] = useState(false);
        const [content6c, setContent6c] = useState('');
        const [sixDisChecked, setsixDisChecked] = useState(false);
        const [content6d, setContent6d] = useState('');
        const [sixEisChecked, setsixEisChecked] = useState(false);
        const [content6e, setContent6e] = useState('');
        const [sixFisChecked, setsixFisChecked] = useState(false);
        const [content6f, setContent6f] = useState('');
        const [sixGisChecked, setsixGisChecked] = useState(false);
        const [content6g, setContent6g] = useState('');
        const [sixHisChecked, setsixHisChecked] = useState(false);

        const [content7, setContent7] = useState('');

        const [validated, setValidated] = useState(false);

        const [dateSaved, setDateSaved] = useState("");

        const [error5, setError5] = useState("");
        const [error6, setError6] = useState("");


        const handle5ACheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveAisChecked(event.target.checked);
        }

        const handle5BCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveBisChecked(event.target.checked);
        }
        const handle5CCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveCisChecked(event.target.checked);
        }
        const handle5DCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveDisChecked(event.target.checked);
        }
        const handle5ECheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveEisChecked(event.target.checked);
        }
        const handle5FCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveFisChecked(event.target.checked);
        }
        const handle5GCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveGisChecked(event.target.checked);
        }
        const handle5HCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiveHisChecked(event.target.checked);
        }

        const handle6ACheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixAisChecked(event.target.checked);
        }

        const handle6BCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixBisChecked(event.target.checked);
        }
        const handle6CCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixCisChecked(event.target.checked);
        }
        const handle6DCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixDisChecked(event.target.checked);
        }
        const handle6ECheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixEisChecked(event.target.checked);
        }
        const handle6FCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixFisChecked(event.target.checked);
        }
        const handle6GCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixGisChecked(event.target.checked);
        }
        const handle6HCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setsixHisChecked(event.target.checked);
        }

        // get the content from the database
        useEffect(() => {
            let writing123Day
            if (props.day === 6) {
                writing123Day = 1
            } else if (props.day === 8) {
                writing123Day = 2
            } else if (props.day === 10) {
                writing123Day = 3
            }
            fetch(URL + `api/writing123/?day=${writing123Day}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + getTokenFromCookie()
                }
            })
                .then(response => response.json())
                .then(data => {
                    data.message = JSON.parse(data.message)
                    setContent1(data.message.content1)
                    setContent2(data.message.content2)
                })
        }, [])

        // load the content from the localstorage
        useEffect(() => {
            if (content) {
                const disableAll = () => {
                    // set all input, textarea and checkbox to be disabled
                    const inputs = document.querySelectorAll('input')
                    const textareas = document.querySelectorAll('textarea')
                    const checkboxes = document.querySelectorAll('input[type=checkbox]')
                    inputs.forEach(input => {
                        input.setAttribute('disabled', 'true')
                    })
                    textareas.forEach(textarea => {
                        textarea.setAttribute('disabled', 'true')
                    })
                    checkboxes.forEach(checkbox => {
                        checkbox.setAttribute('disabled', 'true')
                    })
                }
                disableAll()
                setTimeout(() => { disableAll() })
                // set the content
                setContent3(content['6-3'] || content['10-3'] || content['8-3'])
                setContent4(content['6-4'] || content['10-4'] || content['8-4'])
                setContent5a(content['6-5-a'] || content['10-5-a'] || content['8-5-a'])
                setContent5b(content['6-5-b'] || content['10-5-b'] || content['8-5-b'])
                setContent5c(content['6-5-c'] || content['10-5-c'] || content['8-5-c'])
                setContent5d(content['6-5-d'] || content['10-5-d'] || content['8-5-d'])
                setContent5e(content['6-5-e'] || content['10-5-e'] || content['8-5-e'])
                setContent5f(content['6-5-f'] || content['10-5-f'] || content['8-5-f'])
                setContent5g(content['6-5-g'] || content['10-5-g'] || content['8-5-g'])
                setFiveAisChecked(!!(content['6-5-a'] || content['10-5-a'] || content['8-5-a']))
                setFiveBisChecked(!!(content['6-5-b'] || content['10-5-b'] || content['8-5-b']))
                setFiveCisChecked(!!(content['6-5-c'] || content['10-5-c'] || content['8-5-c']))
                setFiveDisChecked(!!(content['6-5-d'] || content['10-5-d'] || content['8-5-d']))
                setFiveEisChecked(!!(content['6-5-e'] || content['10-5-e'] || content['8-5-e']))
                setFiveFisChecked(!!(content['6-5-f'] || content['10-5-f'] || content['8-5-f']))
                setFiveGisChecked(!!(content['6-5-g'] || content['10-5-g'] || content['8-5-g']))
                setFiveHisChecked(!!(content['6-5-h'] || content['10-5-h'] || content['8-5-h']))
                setContent6a(content['6-6-a'] || content['10-6-a'] || content['8-6-a'])
                setContent6b(content['6-6-b'] || content['10-6-b'] || content['8-6-b'])
                setContent6c(content['6-6-c'] || content['10-6-c'] || content['8-6-c'])
                setContent6d(content['6-6-d'] || content['10-6-d'] || content['8-6-d'])
                setContent6e(content['6-6-e'] || content['10-6-e'] || content['8-6-e'])
                setContent6f(content['6-6-f'] || content['10-6-f'] || content['8-6-f'])
                setContent6g(content['6-6-g'] || content['10-6-g'] || content['8-6-g'])
                setsixAisChecked(!!(content['6-6-a'] || content['10-6-a'] || content['8-6-a']))
                setsixBisChecked(!!(content['6-6-b'] || content['10-6-b'] || content['8-6-b']))
                setsixCisChecked(!!(content['6-6-c'] || content['10-6-c'] || content['8-6-c']))
                setsixDisChecked(!!(content['6-6-d'] || content['10-6-d'] || content['8-6-d']))
                setsixEisChecked(!!(content['6-6-e'] || content['10-6-e'] || content['8-6-e']))
                setsixFisChecked(!!(content['6-6-f'] || content['10-6-f'] || content['8-6-f']))
                setsixGisChecked(!!(content['6-6-g'] || content['10-6-g'] || content['8-6-g']))
                setsixHisChecked(!!(content['6-6-h'] || content['10-6-h'] || content['8-6-h']))
                setContent7(content['6-7'] || content['10-7'] || content['8-7'])
                return
            } else {
                const content = JSON.parse(localStorage.getItem(window.location.href + '_content') || '{}')
                if (content.content3) setContent3(content.content3)
                if (content.content4) setContent4(content.content4)
                if (content.content5a) setContent5a(content.content5a)
                if (content.content5b) setContent5b(content.content5b)
                if (content.content5c) setContent5c(content.content5c)
                if (content.content5d) setContent5d(content.content5d)
                if (content.content5e) setContent5e(content.content5e)
                if (content.content5f) setContent5f(content.content5f)
                if (content.content5g) setContent5g(content.content5g)
                if (content.fiveAisChecked) setFiveAisChecked(content.fiveAisChecked)
                if (content.fiveBisChecked) setFiveBisChecked(content.fiveBisChecked)
                if (content.fiveCisChecked) setFiveCisChecked(content.fiveCisChecked)
                if (content.fiveDisChecked) setFiveDisChecked(content.fiveDisChecked)
                if (content.fiveEisChecked) setFiveEisChecked(content.fiveEisChecked)
                if (content.fiveFisChecked) setFiveFisChecked(content.fiveFisChecked)
                if (content.fiveGisChecked) setFiveGisChecked(content.fiveGisChecked)
                if (content.fiveHisChecked) setFiveHisChecked(content.fiveHisChecked)
                if (content.content6a) setContent6a(content.content6a)
                if (content.content6b) setContent6b(content.content6b)
                if (content.content6c) setContent6c(content.content6c)
                if (content.content6d) setContent6d(content.content6d)
                if (content.content6e) setContent6e(content.content6e)
                if (content.content6f) setContent6f(content.content6f)
                if (content.content6g) setContent6g(content.content6g)
                if (content.sixAisChecked) setsixAisChecked(content.sixAisChecked)
                if (content.sixBisChecked) setsixBisChecked(content.sixBisChecked)
                if (content.sixCisChecked) setsixCisChecked(content.sixCisChecked)
                if (content.sixDisChecked) setsixDisChecked(content.sixDisChecked)
                if (content.sixEisChecked) setsixEisChecked(content.sixEisChecked)
                if (content.sixFisChecked) setsixFisChecked(content.sixFisChecked)
                if (content.sixGisChecked) setsixGisChecked(content.sixGisChecked)
                if (content.sixHisChecked) setsixHisChecked(content.sixHisChecked)
                if (content.content7) setContent7(content.content7)
                setDateSaved("已自动加载上次的写作内容")
            }
        }, [content])

        // save the content to the localstorage
        useEffect(() => {
            if (content) {
                return
            }
            else {
                const raw_content = {
                    "content3": content3,
                    "content4": content4,
                    "content5a": content5a,
                    "content5b": content5b,
                    "content5c": content5c,
                    "content5d": content5d,
                    "content5e": content5e,
                    "content5f": content5f,
                    "content5g": content5g,
                    "fiveAisChecked": fiveAisChecked,
                    "fiveBisChecked": fiveBisChecked,
                    "fiveCisChecked": fiveCisChecked,
                    "fiveDisChecked": fiveDisChecked,
                    "fiveEisChecked": fiveEisChecked,
                    "fiveFisChecked": fiveFisChecked,
                    "fiveGisChecked": fiveGisChecked,
                    'fiveHisChecked': fiveHisChecked,
                    "content6a": content6a,
                    "content6b": content6b,
                    "content6c": content6c,
                    "content6d": content6d,
                    "content6e": content6e,
                    "content6f": content6f,
                    "content6g": content6g,
                    "sixAisChecked": sixAisChecked,
                    "sixBisChecked": sixBisChecked,
                    "sixCisChecked": sixCisChecked,
                    "sixDisChecked": sixDisChecked,
                    "sixEisChecked": sixEisChecked,
                    "sixFisChecked": sixFisChecked,
                    "sixGisChecked": sixGisChecked,
                    'sixHisChecked': sixHisChecked,
                    "content7": content7
                }
                const content = JSON.stringify(raw_content)
                if (content != localStorage.getItem(window.location.href + '_content') && Object.values(raw_content).some(key => key)) {
                    localStorage.setItem(window.location.href + '_content', content)
                    setDateSaved(moment().format("HH:mm") + " 已自动保存于本地")
                }
            }

        }, [
            content3, content4, content5a, content5b, content5c, content5d, content5e, content5f, content5g,
            fiveAisChecked, fiveBisChecked, fiveCisChecked, fiveDisChecked, fiveEisChecked, fiveFisChecked, fiveGisChecked, fiveHisChecked,
            content6a, content6b, content6c, content6d, content6e, content6f, content6g,
            sixAisChecked, sixBisChecked, sixCisChecked, sixDisChecked, sixEisChecked, sixFisChecked, sixGisChecked, sixHisChecked,
            content7, content])



        const handleSubmit = async (event: SyntheticEvent) => {
            event.preventDefault();
            const form = event.currentTarget;

            let valid = true

            console.log(form)

            if (!((form as HTMLInputElement).checkValidity())) {
                valid = false
            }

            if ([fiveAisChecked, fiveBisChecked, fiveCisChecked, fiveDisChecked, fiveEisChecked, fiveFisChecked, fiveGisChecked, fiveHisChecked].every(key => !key)) {
                valid = false
                setError5("请至少选择一个选项")
            } else {
                setError5("")
            }

            if ([sixAisChecked, sixBisChecked, sixCisChecked, sixDisChecked, sixEisChecked, sixFisChecked, sixGisChecked, sixHisChecked].every(key => !key)) {
                valid = false
                setError6("请至少选择一个选项")
            } else {
                setError6("")
            }

            if (!valid) {
                setValidated(false);
            }
            else {
                setValidated(true);
                const payload = {
                    'day': props.day,
                    "content1": content1,
                    "content2": content2,
                    "content3": content3,
                    "content4": content4,
                    "content5a": content5a,
                    "content5b": content5b,
                    "content5c": content5c,
                    "content5d": content5d,
                    "content5e": content5e,
                    "content5f": content5f,
                    "content5g": content5g,
                    "fiveAisChecked": fiveAisChecked,
                    "fiveBisChecked": fiveBisChecked,
                    "fiveCisChecked": fiveCisChecked,
                    "fiveDisChecked": fiveDisChecked,
                    "fiveEisChecked": fiveEisChecked,
                    "fiveFisChecked": fiveFisChecked,
                    "fiveGisChecked": fiveGisChecked,
                    "fiveHisChecked": fiveHisChecked,
                    "content6a": content6a,
                    "content6b": content6b,
                    "content6c": content6c,
                    "content6d": content6d,
                    "content6e": content6e,
                    "content6f": content6f,
                    "content6g": content6g,
                    "sixAisChecked": sixAisChecked,
                    "sixBisChecked": sixBisChecked,
                    "sixCisChecked": sixCisChecked,
                    "sixDisChecked": sixDisChecked,
                    "sixEisChecked": sixEisChecked,
                    "sixFisChecked": sixFisChecked,
                    "sixGisChecked": sixGisChecked,
                    "sixHisChecked": sixHisChecked,
                    "content7": content7,
                }
                const res = await fetch(URL + "api/writing6810/", {
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


        const articles = props.content


        const WORD_MIN_LIMIT = 20;
        return <div className={style.content}>
            <style>
                {`
                .was-validated textarea{
                    background-image: none !important;
                }
                `}
            </style>
            <div className={style.title}>第{props.day}天</div>
            <div style={{ margin: '3em' }}>
                <Markdown classname={style.markdown}>
                    {articles}
                </Markdown>
            </div>
            <div className={style.line}></div>
            <div className={style.form}>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Label>1）发生了什么事情？以下是您之前上传的内容</Form.Label>
                    <Form.Group controlId="formBasicContent1">
                        <Form.Control
                            type="text"
                            as="textarea"
                            value={content1}
                            rows={15}
                            disabled
                            onChange={e => setContent1(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            请至少输入20个字
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group controlId="formBasicContent2">
                        <Form.Label>2）你当时有什么想法？以下是您之前上传的内容</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            value={content2}
                            rows={15}
                            disabled
                            onChange={e => setContent2(e.target.value)} />
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
                            onChange={e => setContent3(e.target.value)} />
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
                            onChange={e => setContent4(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            请至少输入20个字
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicContent5">
                        <Form.Label>5）在以上您列出的所有想法里，您看到了哪些类型的非适应性思维？[多选题]</Form.Label>
                        {error5 && <p className={style.error}>{error5}</p>}
                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>a) 非黑即白</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveAisChecked}
                                onChange={handle5ACheckboxChange}
                            />
                        </div>
                        <div className={fiveAisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="Content5a">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveAisChecked}
                                    required={fiveAisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5a}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5a(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>b) 以偏概全</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveBisChecked}
                                onChange={handle5BCheckboxChange}
                            />
                        </div>
                        <div className={fiveBisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="Content5b">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveBisChecked}
                                    required={fiveBisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5b}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5b(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>c) 灾难化思维</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveCisChecked}
                                onChange={handle5CCheckboxChange}
                            />
                        </div>
                        <div className={fiveCisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content5c">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveCisChecked}
                                    required={fiveCisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5c}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5c(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>d) 揣摩人心</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveDisChecked}
                                onChange={handle5DCheckboxChange}
                            />
                        </div>
                        <div className={fiveDisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content5d">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveDisChecked}
                                    required={fiveDisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5d}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5d(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>e) 过分自责</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveEisChecked}
                                onChange={handle5ECheckboxChange}
                            />
                        </div>
                        <div className={fiveEisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content5e">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveEisChecked}
                                    required={fiveEisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5e}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5e(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>f) 对号入座</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveFisChecked}
                                onChange={handle5FCheckboxChange}
                            />
                        </div>
                        <div className={fiveFisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content5f">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveFisChecked}
                                    required={fiveFisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5f}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5f(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>g) 其它</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveGisChecked}
                                onChange={handle5GCheckboxChange}
                            />
                        </div>
                        <div className={fiveGisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content5g">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!fiveGisChecked}
                                    required={fiveGisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content5g}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent5g(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>h) 我没有发现自己的非适应性思维。</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={fiveHisChecked}
                                onChange={handle5HCheckboxChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicContent6">
                        <Form.Label>6）接下来，让我们通过问问题来帮助自己寻找更灵活的思维方式。针对您所找到的这些非适应性思维，您会问以下哪几种问题呢？又会怎样回答这些问题呢？[多选题]</Form.Label>
                        {error6 && <p className={style.error}>{error6}</p>}
                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>a) 有什么证据可以支持这些想法吗？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixAisChecked}
                                onChange={handle6ACheckboxChange}
                            />
                        </div>
                        <div className={sixAisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="Content6a">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixAisChecked}
                                    required={sixAisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6a}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6a(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>b) 有什么证据可以反驳这些想法吗？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixBisChecked}
                                onChange={handle6BCheckboxChange}
                            />
                        </div>
                        <div className={sixBisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="Content6b">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixBisChecked}
                                    required={sixBisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6b}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6b(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>c) 这些想法是不是只关注了事情的一面？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixCisChecked}
                                onChange={handle6CCheckboxChange}
                            />
                        </div>
                        <div className={sixCisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content6c">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixCisChecked}
                                    required={sixCisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6c}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6c(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>d) 这些想法的产生是基于你的感受还是基于事实？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixDisChecked}
                                onChange={handle6DCheckboxChange}
                            />
                        </div>
                        <div className={sixDisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content6d">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixDisChecked}
                                    required={sixDisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6d}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6d(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>e) 这些想法是不是只关注了事情的一面？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixEisChecked}
                                onChange={handle6ECheckboxChange}
                            />
                        </div>
                        <div className={sixEisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content6e">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixEisChecked}
                                    required={sixEisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6e}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6e(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>f) 这些想法是否高估了事情发生的概率？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixFisChecked}
                                onChange={handle6FCheckboxChange}
                            />
                        </div>
                        <div className={sixFisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content6f">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixFisChecked}
                                    required={sixFisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6f}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6f(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>g) 这些想法的信息来源可靠吗？</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixGisChecked}
                                onChange={handle6GCheckboxChange}
                            />
                        </div>
                        <div className={sixGisChecked ? style.thought : style.hiddenThought}>
                            <Form.Group controlId="content6g">
                                <Form.Label>对应的想法：</Form.Label>
                                <Form.Control
                                    disabled={!sixGisChecked}
                                    required={sixGisChecked}
                                    type="text"
                                    as="textarea" rows={3}
                                    value={content6g}
                                    minLength={WORD_MIN_LIMIT}
                                    onChange={e => setContent6g(e.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    请至少输入20个字
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className={style.checkboxContainer}>
                            <div className={style.checkboxLabel}>h) 我没有发现自己的非适应性思维，所以我不需要提问。</div>
                            <input className={style.checkbox}
                                type="checkbox"
                                checked={sixHisChecked}
                                onChange={handle6HCheckboxChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicContent7">
                        <Form.Label>7）在思考完以上问题之后，您认为自己可以如何更灵活、全面地看待当时的处境？（字数要求：≥300字）</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            as="textarea" rows={5}
                            value={content7}
                            minLength={300}
                            onChange={e => setContent7(e.target.value)} />
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