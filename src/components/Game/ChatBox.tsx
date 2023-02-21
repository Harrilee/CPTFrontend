import {textResponse, questionResponse, choicePayload} from "./Game";
import React, {MouseEventHandler, useState} from "react";
import style from "./ChatBox.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Draggable from 'react-draggable';
import ModalDialog from 'react-bootstrap/ModalDialog';
import {Choice} from "./Choice";

type Prop = {
    message: textResponse|questionResponse,

    elicitResponse: (payload:choicePayload) => void
}

class DraggableModalDialog extends React.Component {
    render() {
        return <Draggable handle=".modal-header"><ModalDialog {...this.props} />
        </Draggable>
    }
}

export function ChatBox(props:Prop) {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const choiceHandler = (event: React.MouseEvent, choice: string) => {

        setShow(false)
        props.elicitResponse({"choice": choice})
        console.log(choice)

    }

    const clientWrapper = (content:textResponse) => {
        return <div className={style.clientMsg}>{content.text}</div>
    }

    const userWrapper = (content:textResponse) => {
        return <div className={style.userMsg}>{content.text}</div>
    }

    const supervisorWrapper = (content:questionResponse) => {

        const choices = JSON.parse(content.choices);
        const choicesArray = []
        console.log(choices)
        for (const [key, value] of Object.entries(choices)) {
            choicesArray.push(value)
        }

        return   <>
            <Modal dialogAs={DraggableModalDialog}
                   show={show}
                   animation={false}
                   backdrop="static"
                   centered
                   onHide={handleClose}>


                <Modal.Header className={style.modalHeader} closeButton>
                    <Modal.Title>导师</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={style.modalQuestion}>{content.text}</div>
                    <div>
                        { choicesArray.map((choice, index: number) =>
                        { return <Choice onClick={(e)=>choiceHandler(e,choice as string)} choice={choice as string} key={index}/> })}
                    </div>


                </Modal.Body>

            </Modal>
        </>
    }




    const message = props.message

    console.log(message)

    let result;

    if (message.speaker === "client") {
        result = clientWrapper(message)
    }

    else if (message.speaker === "supervisor") {

        result = supervisorWrapper(message as questionResponse)
    }

    else if (message.speaker === "user") {

        result = userWrapper(message)

    }else{
        console.log("response object does not have valid speaker")
    }


    return <>{result}</>;

}