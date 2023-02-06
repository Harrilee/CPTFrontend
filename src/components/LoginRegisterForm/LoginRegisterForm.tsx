import React, {SyntheticEvent, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


type Props = {
    panel: string,
    validated: boolean,
    submitHandler: (event: SyntheticEvent, name: string, email: string, pwd: string) => void

}

export function LoginRegisterForm(props: Props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');

    let onSubmit = (e: SyntheticEvent) => {
        props.submitHandler(e, name, email, pwd)
    };


    let form;

    if (props.panel==="Login"){
        form = <>
            <Form validated={props.validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email*"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password*"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    }
    else {
        form = <>
            <Form validated={props.validated} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        required
                        type="name"
                        placeholder="Name*"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email*"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password*"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    }


    return form
}