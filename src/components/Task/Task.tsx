import React from 'react';
import style from './Task.module.scss';
import Button from "react-bootstrap/Button";

type Props = {
    days: number,
    questionType: string,
    timeToFinish: number,
    taskURL: string,

}
export function Task(props: Props){

    let placeHolder=''
    if (props.days<10){
        placeHolder = ''
    }
    else if (props.days<100){
        placeHolder = ''
    }

    return <>
        <div className={style.taskContainer}>
            <div className={style.taskTitle}>第{placeHolder+props.days}天</div>
            <div>{props.questionType}</div>
            <Button className={style.button} onClick={()=>{window.location.href = props.taskURL}}>
                点击开始
            </Button>
            <div>预计时间：{props.timeToFinish}分钟</div>
        </div>
    </>
}
