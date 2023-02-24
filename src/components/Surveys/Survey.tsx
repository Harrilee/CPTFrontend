import React from 'react';
import style from './Survey.module.scss'
type Prop = {
    url: string
}
export function Survey (props:Prop) {
    return <div>
        <iframe className={style.iframe} src={props.url}> </iframe>
    </div>
}