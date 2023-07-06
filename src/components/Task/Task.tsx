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

  const intDay = parseInt(props.days.toString())

  let placeHolder = ''
  if (props.days < 10) {
      placeHolder = ''
  } else if (props.days < 100) {
      placeHolder = ''
  }

  let button = (
      <Button
          className={style.button}
          onClick={() => {
              window.location.href = props.taskURL
          }}
      >
          点击开始
      </Button>
  )

  if (props.currentDay > props.days) {
      button = (
          <Button className={style.button} disabled>
              已经完成
          </Button>
      )
  } else if (props.currentDay < props.days) {
      button = (
          <Button className={style.button} disabled>
              尚未开放
          </Button>
      )
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
