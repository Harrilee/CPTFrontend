import {textResponse, questionResponse, choicePayload} from "./Game";
import React, {Dispatch, MouseEventHandler, SetStateAction, useEffect, useState} from "react";
import style from "./ChatBox.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Draggable from 'react-draggable';
import ModalDialog from 'react-bootstrap/ModalDialog';
import {Choice} from "./Choice";

type Prop = {
    message: textResponse | questionResponse,
    index: number,
    length: number,

    showArr: boolean[],
    setShowArr: Dispatch<SetStateAction<boolean[]>>,
    setChat: Dispatch<SetStateAction<any[]>>,
    elicitResponse: (payload: choicePayload) => void
}

class DraggableModalDialog extends React.Component {
    render() {
        return <Draggable handle=".modal-header"><ModalDialog {...this.props} />
        </Draggable>
    }
}

export function ChatBox(props: Prop) {
    const [showable, setShowable] = useState(false)
    const [show, setShow] = useState(false)
    const [close, setClose] = useState(false)
    const [result, setResult] = useState<any>(null)
    const handleClose = () => setShowable(false);
    const handleShow = () => setShowable(true);

    const choiceHandler = (event: React.MouseEvent, choice: string) => {

        setShow(false)
        setClose(true)
        updateParentShowArr(0)
        props.elicitResponse({"choice": choice})
        console.log(choice)

    }

    const transitionHandler = (event: React.MouseEvent, choice: string) => {

        setShow(false)
        setClose(true)
        props.setShowArr([])
        props.setChat([])
        props.elicitResponse({"choice": choice})
        console.log('transitionHandler',choice)

    }

    const textModalCloseHandler = (event: React.MouseEvent) => {
        setShow(false)
        setClose(true)
        updateParentShowArr(0)


    }


    const updateParentShowArr = (waitingTime:number) => {
        if (showable && props.index !== props.length - 1 && (props.showArr.some((value) => value === false))) {
            setTimeout(()=>{
                const arr = props.showArr.slice()
                arr[props.index + 1] = true
                // console.log('finished callback')
                props.setShowArr(arr)
            }, waitingTime);

        }
    }
    const clientWrapper = (content: textResponse) => {
        updateParentShowArr(100)
        return <div className={showable ? style.clientMsg : style.hide}>{content.text}</div>
    }


    const userWrapper = (content: textResponse) => {
        updateParentShowArr(100)
        return <div className={showable ? style.userMsg : style.hide}>{content.text}</div>
    }

    const supervisorWrapper = (content: questionResponse) => {

        const choices = JSON.parse(content.choices);
        const choicesArray = []
        console.log(choices)
        let transition = false

        for (const [key, value] of Object.entries(choices)) {
            choicesArray.push(value as string)
        }

        if (choicesArray.length==1 && choicesArray[0]=="继续") {
            // console.log('transition caught here')
            transition = true
        }

        content.text = content.text.replaceAll('//', '\n')

        return <>
            <Modal dialogAs={DraggableModalDialog}
                   show={show}
                   animation={false}
                   backdrop="static"
                   centered
                   onHide={handleClose}>


                <Modal.Header className={style.modalHeader}>
                    <Modal.Title>导师</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={style.modalQuestion}>{content.text}</div>
                    <div>
                        {choicesArray.map((choice, index: number) => {

                            return <Choice onClick={transition? (e) => transitionHandler(e, choice as string) :(e) => choiceHandler(e, choice as string)} choice={choice as string} key={index}/>
                        })}
                    </div>


                </Modal.Body>

            </Modal>
        </>
    }

    const supervisorTextWrapper = (content: textResponse) => {

        content.text = content.text.replaceAll('//', '\n')
        if (content.text === "游戏结束") {
            console.log('game over')
            return <>
                <Modal dialogAs={DraggableModalDialog}
                       show={show}
                       animation={false}
                       backdrop="static"
                       centered
                       onHide={handleClose}>


                    <Modal.Header className={style.modalHeader}>
                        <Modal.Title>导师</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={style.modalQuestion}>{content.text}</div>
                        <Button variant="primary" onClick={(e) => window.location.href='/home'}>继续</Button>
                    </Modal.Body>

                </Modal>
            </>
        }


        return <>
            <Modal dialogAs={DraggableModalDialog}
                   show={show}
                   animation={false}
                   backdrop="static"
                   centered
                   onHide={handleClose}>


                <Modal.Header className={style.modalHeader}>
                    <Modal.Title>导师</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={style.modalQuestion}>{content.text}</div>
                    <Button variant="primary" onClick={(e) => textModalCloseHandler(e)}>继续</Button>
                </Modal.Body>

            </Modal>
        </>
    }




    const message = props.message



    useEffect(() => {
        // console.log('useEffect')
        // console.log(message)
        // console.log(props.showArr)
        // console.log(props.index)
        // console.log('setShowable to',props.showArr[props.index])

        setShowable(props.showArr[props.index])
        // console.log('showable',showable)
        if (close===true) {
            setShow(false)
        }
        else{
            setShow(showable)
        }
        // console.log('set show to',show)

        if (message.speaker === "client") {
            setResult(clientWrapper(message))
        } else if (message.speaker === "supervisorText") {
            setResult(supervisorTextWrapper(message))
        } else if (message.speaker === "supervisor") {

            setResult(supervisorWrapper(message as questionResponse))
        } else if (message.speaker === "user") {

            setResult(userWrapper(message))

        }
        else {
            console.log("response object does not have valid speaker")
        }

    }, [showable,show,close,props.showArr[props.index]])





    return <>{result}</>;

}