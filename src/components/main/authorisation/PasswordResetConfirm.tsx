import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {usePasswordResetConfirm} from "./hooks";
import {PasswordError} from "./types";
import routes from "../../../routes";
import {FadeLoader} from "react-spinners";

const PasswordResetConfirm = () => {
    const {token} = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError, setPasswordError] = useState<PasswordError | null>(null)
    const {mutate, error, isSuccess, isLoading} = usePasswordResetConfirm()
    const navigate = useNavigate()
    const sendPassword = () => {
        if (password1 === password2) {
            mutate({token: String(token), password: password1})
        }
    }
    useEffect(() => {
        error?.response?.data && setPasswordError(error.response.data as PasswordError)
        isSuccess && navigate(routes.LOGIN())
    }, [error, isSuccess, navigate])

    return (
        <Container className={'d-flex justify-content-center align-items-center flex-grow-1 w-50 flex-column'}>
            <Form.Control name="password"
                          type={'password'}
                          onChange={(e) => setPassword1(e.target.value)}
                          placeholder={'Введите новый пароль'}
            ></Form.Control>
            <Form.Control className={'mt-4'}
                          name="password"
                          type={'password'}
                          onChange={(e) => setPassword2(e.target.value)}
                          placeholder={'Повторите новый пароль'}
            ></Form.Control>
            <Button variant={'primary'} className={'mt-4 w-100'} onClick={sendPassword}>Сменить пароль</Button>
            {password1 !== password2 && <Alert variant={'danger'} className={'mt-4 w-100'}>
                        Пароли не совпадают
            </Alert>}
            {passwordError?.password && <Alert variant={'danger'} className={'mt-4'}>
                {passwordError.password}
            </Alert>}
            <FadeLoader className={'mt-4'} color={'#36d7b7'} loading={isLoading}/>
        </Container>
    )
}

export default PasswordResetConfirm;