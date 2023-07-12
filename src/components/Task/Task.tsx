import React, { useRef, useState } from 'react';
import style from './Task.module.scss';
import Button from "react-bootstrap/Button";
import Overlay from 'react-bootstrap/Overlay';

type Props = {
    days: number,
    currentDay: number,
    questionType: string,
    timeToFinish: number,
    taskURL: string,
    isOpen?: true | string[],
    isUnread?: boolean,
}
export function Task(props: Props) {
    const [show, setShow] = useState(false)
    const intDay = parseInt(props.days.toString())
    const target = useRef(null);

    let placeHolder = ''
    if (props.days < 10) {
        placeHolder = ''
    } else if (props.days < 100) {
        placeHolder = ''
    }

    let button


    if (props.isOpen === true) {
        button =
            <Button
                className={style.button}
                onClick={() => {
                    if (['/day0', '/day1', '/day29', '/day45', '/day105'].includes(props.taskURL)) {
                        window.open(props.taskURL, '_blank')
                    }
                    else {
                        window.location.href = props.taskURL
                    }
                }}
            >
                点击开始
            </Button>
    } else {
        if (props.currentDay > props.days) {
            button = (
                <Button className={style.button} disabled>
                    已经完成
                </Button>
            )
        } else {
            button = (
                <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} ref={target}>
                    <Button className={style.button} disabled>
                        尚未开放
                        <Overlay target={target.current} show={show} placement="left">
                            <div className={style.reasonWrapper}>
                                <p>任务未开启的原因</p>
                                {(props.isOpen as string[]).map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))}</div>
                        </Overlay>

                    </Button>
                </div>
            )
        }
    }

    return (
        <>
            <div className={style.taskContainer}>
                <div className={style.taskTitle}>第{placeHolder + intDay}天</div>
                <div style={{ minWidth: '8em' }}>{props.questionType}</div>
                {button}
                <div className={style.timeToFinish}>预计时间：{props.timeToFinish}分钟</div>
            </div>
        </>
    )
}
