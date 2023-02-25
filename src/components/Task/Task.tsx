import React from 'react';
import style from './Task.module.scss';
import Button from "react-bootstrap/Button";

type Props = {
    days: number,
    currentDay: number,
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

    let button =  <Button className={style.button} onClick={()=>{window.location.href = props.taskURL}}>
        点击开始
    </Button>

    if (props.questionType !== '问卷调查' && props.currentDay > props.days) {
        button =  <Button className={style.button} disabled>
            已经完成
        </Button>
    }
    else if (props.questionType !== '问卷调查' && props.currentDay < props.days){
        button =  <Button className={style.button} disabled>
            尚未开启
        </Button>
    }

    return <>
        <div className={style.taskContainer}>
            <div className={style.taskTitle}>第{placeHolder+props.days}天</div>
            <div>{props.questionType}</div>
            {button}
            <div>预计时间：{props.timeToFinish}分钟</div>
        </div>
    </>
}
