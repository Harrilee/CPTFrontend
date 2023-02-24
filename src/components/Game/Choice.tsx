import React  from 'react';
import style from './Choice.module.scss';
import Nav from "react-bootstrap/Nav";
type Prop = {
    choice:string
    onClick: (event: React.MouseEvent) => void;
}
export function Choice(props:Prop) {
    const choice = props.choice.replace("//", "\n")
    return <div className={style.choice} onClick={(e) => props.onClick(e)}>{choice}</div>

}