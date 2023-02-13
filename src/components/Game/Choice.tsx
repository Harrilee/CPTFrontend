import React  from 'react';
import style from './Choice.module.scss';
type Prop = {
    choice:string
    onClick: (event: React.MouseEvent) => void;
}
export function Choice(props:Prop) {

    return <div className={style.choice} onClick={(e)=>props.onClick(e)}>{props.choice}</div>
}